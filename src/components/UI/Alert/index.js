import React, { useEffect } from 'react'
import styled from 'styled-components'

import errorMessage from 'util/errorMessage'

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
  if (autoClose) {
    useEffect(() => {
      const timer = setTimeout(() => onRemove(alert.id), autoClose * 1000)

      return () => clearTimeout(timer)
    }, [])
  }

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
  autoClose: 10, // seconds
}

export default Alert
