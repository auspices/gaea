import React from 'react'
import styled from 'styled-components'
import { Box, Props as BoxProps } from '../../../components/UI/Box'
import {
  BorderedTextInput,
  Props as BorderedTextInputProps,
} from '../../../components/UI/Inputs'

const Container = styled(Box)`
  display: flex;

  & + & {
    margin-top: -1px;
  }
`

const Label = styled(Box).attrs({
  ...BorderedTextInput.defaultProps,
})`
  display: flex;
  align-items: center;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: -1px;
`

const Input = styled(BorderedTextInput)`
  flex: 1;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

type Props = BoxProps & {
  label: React.ReactNode
  input: BorderedTextInputProps
}

export const Field: React.FC<Props> = ({ label, input, ...rest }) => {
  return (
    <Container {...rest}>
      <Label>{label}</Label>
      <Input {...input} />
    </Container>
  )
}
