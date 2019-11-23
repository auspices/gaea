import styled from 'styled-components'
import {
  width,
  space,
  fontFamily,
  fontSize,
  border,
  borderRadius,
  borderColor,
} from 'styled-system'

export const TextInput = styled.input`
  appearance: none;
  display: block;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${width}
  ${fontFamily}
  ${fontSize}
  ${space}
  ${border}
  ${borderRadius}
  ${borderColor}

  &:focus {
    outline: 0;
  }
`

TextInput.defaultProps = {
  font: 'body',
  fontSize: 2,
  px: 6,
}

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
