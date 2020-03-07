import styled from 'styled-components'
import {
  border,
  borderColor,
  BorderColorProps,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from 'styled-system'

export type Props = React.InputHTMLAttributes<HTMLInputElement> &
  BorderColorProps &
  BorderProps &
  BorderRadiusProps &
  FontFamilyProps &
  FontSizeProps &
  SpaceProps &
  WidthProps

export const TextInput = styled.input<Props>`
  appearance: none;
  display: block;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${border}
  ${borderColor}
  ${borderRadius}
  ${fontFamily}
  ${fontSize}
  ${space}
  ${width}

  &:focus {
    outline: 0;
  }

  &:autofill {
    font-size: 1rem;
  }
`

TextInput.defaultProps = {
  fontFamily: 'body',
  fontSize: 2,
  px: 6,
}
