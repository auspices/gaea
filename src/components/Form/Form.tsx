import styled from 'styled-components'
import { boxMixin, BoxProps, PILL } from '@auspices/eos'

export type FormProps = BoxProps

export const Form = styled.form<FormProps>`
  display: flex;
  flex: 1;
  ${boxMixin}
`

Form.defaultProps = { ...PILL, px: 0, py: 0 }
