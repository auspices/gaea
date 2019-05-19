import styled, { css } from 'styled-components'
import {
  display,
  position,
  space,
  color,
  width,
  height,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  fontSize,
  border,
  borderRadius,
  borderColor,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  alignSelf,
  textAlign,
  top,
  right,
  bottom,
  left,
  zIndex,
} from 'styled-system'

export const mixin = css`
  ${display}
  ${position}
  ${space}
  ${color}
  ${width}
  ${height}
  ${minHeight}
  ${maxHeight}
  ${minWidth}
  ${maxWidth}
  ${fontSize}
  ${border}
  ${borderRadius}
  ${borderColor}
  ${flex}
  ${flexDirection}
  ${justifyContent}
  ${alignItems}
  ${alignSelf}
  ${textAlign}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${zIndex}
`

export const Box = styled.div`
  ${mixin}
`

export default Box
