import React from 'react'
import styled from 'styled-components'

import { Box } from 'components/UI/Box'

const Container = styled(Box).attrs({
  p: 6,
  lineHeight: 2,
})`
  flex: 1;
  width: 80ch;
  max-width: 100%;
  border: 1px solid black;
`

export const ContentEntityText = ({ text, ...rest }) => {
  return <Container {...rest}>{text.body}</Container>
}
