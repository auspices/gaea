import { TextInput } from './TextInput'
import styled from 'styled-components'

export const BorderedTextInput = styled(TextInput)`
  & + & {
    margin-top: -1px;
  }
`

BorderedTextInput.defaultProps = {
  ...TextInput.defaultProps,
  py: 5,
  px: 6,
  border: '1px solid',
  borderColor: 'black',
  borderRadius: 4,
}
