import React from 'react'
import styled from 'styled-components'

import Box from 'components/UI/Box'

const Container = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'column',
  p: 6,
  minHeight: '100vh',
})``

export const Page = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
)
