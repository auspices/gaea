import React, { useEffect } from 'react'
import styled from 'styled-components'

import { errorMessage } from 'util/errors'

import Box from 'components/UI/Box'

const Container = styled(Box).attrs({
  py: 4,
  px: 5,
  mb: 3,
  fontSize: 0,
})`
  width: 100%;
  border-radius: 4px;

  ${props =>
    ({
      ALERT: `
      background-color: lightgray;
      color: black;
    `,
      ERROR: `
      background-color: red;
      color: white;
    `,
    }[props.type])}
`

const Alert = ({ alert, autoClose, onRemove, children }) => {
  useEffect(() => {
    let timer
    if (autoClose) {
      timer = setTimeout(() => onRemove(alert.id), autoClose * 1000)
    }
    return () => clearTimeout(timer)
  }, [alert.id, autoClose, onRemove])

  const handleClick = e => {
    e.preventDefault()

    onRemove(alert.id)
  }

  return (
    <Container type={alert.type} onClick={handleClick}>
      {
        {
          ALERT: children,
          ERROR: errorMessage(alert),
        }[alert.type]
      }
    </Container>
  )
}

Alert.defaultProps = {
  autoClose: 5, // seconds
}

export default Alert
