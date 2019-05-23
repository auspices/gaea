import React from 'react'
import styled from 'styled-components'

import { Box } from 'components/UI/Box'
import { BorderedTextInput } from 'components/UI/Inputs'

const Container = styled(Box)`
  display: flex;

  & + & {
    margin-top: -1px;
  }
`

const Key = styled(BorderedTextInput)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: -1px;
  flex: 0.25;
`

const Value = styled(BorderedTextInput)`
  flex: 0.75;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

export const KeyValueInput = ({ k, v, ...rest }) => {
  return (
    <Container {...rest}>
      <Key {...k} />
      <Value {...v} />
    </Container>
  )
}
