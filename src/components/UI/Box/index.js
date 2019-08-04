import styled, { css } from 'styled-components'
import {
  alignItems,
  alignSelf,
  border,
  borderColor,
  borderRadius,
  bottom,
  color,
  compose,
  display,
  flex,
  flexDirection,
  fontSize,
  height,
  justifyContent,
  left,
  lineHeight,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  position,
  right,
  space,
  textAlign,
  top,
  width,
  zIndex,
} from 'styled-system'

export const mixin = css(
  compose(
    alignItems,
    alignSelf,
    border,
    borderColor,
    borderRadius,
    bottom,
    color,
    display,
    flex,
    flexDirection,
    fontSize,
    height,
    justifyContent,
    left,
    lineHeight,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    position,
    right,
    space,
    textAlign,
    top,
    width,
    zIndex
  )
)

export const Box = styled.div`
  ${mixin}
`

export default Box
