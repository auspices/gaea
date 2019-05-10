import React, { useEffect } from 'react'
import styled from 'styled-components'

import { errorMessage } from 'util/errors'

import Box from 'components/UI/Box'

const Container = styled(Box).attrs({
  py: 4,
  px: 5,
  mb: 3,
  fontSize: 0,
  borderRadius: 4,
})`
  width: 100%;
  user-select: none;

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

export const Alert = ({ alert, onRemove, children }) => {
  useEffect(() => {
    const timeout = { ALERT: 1000, ERROR: 6000 }[alert.type]
    const timer = setTimeout(() => {
      onRemove(alert.id)
    }, timeout)

    return () => clearTimeout(timer)
  }, [alert.id, alert.type, onRemove])

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

export default Alert
