import React, { useContext } from 'react'
import styled from 'styled-components'

import { Store } from './Store'

import Box from 'components/UI/Box'
import Alert from 'components/UI/Alert'

const Container = styled(Box).attrs({
  p: 3,
})`
  position: fixed;
  top: 0;
  right: 0;
  width: 20em;
  z-index: 1;
`

export const WithAlerts = WrappedComponent => {
  const WithAlerts = props => {
    const { dispatch } = useContext(Store)

    const dispatchError = error =>
      dispatch({
        type: 'CREATE_ALERT',
        payload: {
          type: 'ERROR',
          ...error,
        },
      })

    const dispatchAlert = message =>
      dispatch({
        type: 'CREATE_ALERT',
        payload: {
          type: 'ALERT',
          message,
        },
      })

    return (
      <WrappedComponent
        dispatchAlert={dispatchAlert}
        dispatchError={dispatchError}
        {...props}
      />
    )
  }

  return WithAlerts
}

export default () => {
  const {
    state: { alerts },
    dispatch,
  } = useContext(Store)

  const handleRemove = alertId => {
    dispatch({
      type: 'REMOVE_ALERT',
      payload: alertId,
    })
  }

  return (
    <Container>
      {alerts.map(alert => (
        <Alert key={alert.id} alert={alert} onRemove={handleRemove}>
          {alert.message}
        </Alert>
      ))}
    </Container>
  )
}
