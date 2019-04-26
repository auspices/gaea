import styled from 'styled-components'
import { space, fontFamily, fontSize } from 'styled-system'

export const TextInput = styled.input`
  appearance: none;
  display: block;
  background-color: transparent;
  border: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${fontFamily}
  ${fontSize}
  ${space}

  &:focus {
    outline: 0;
  }
`

TextInput.defaultProps = {
  font: 'body',
  fontSize: 2,
  px: 6,
}
