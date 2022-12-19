import styled from 'styled-components'
import { BoxProps, cellMixin } from '@auspices/eos'

export type FormProps = BoxProps

export const Form = styled.form<FormProps>`
  display: flex;
  flex: 1;
  ${cellMixin}
`

Form.defaultProps = { backgroundColor: 'transparent', px: 0, py: 0 }
