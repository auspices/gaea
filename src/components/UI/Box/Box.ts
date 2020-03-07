import {
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
  border,
  borderColor,
  BorderColorProps,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  bottom,
  BottomProps,
  color,
  ColorProps,
  compose,
  display,
  DisplayProps,
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  fontSize,
  FontSizeProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
  left,
  LeftProps,
  lineHeight,
  LineHeightProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
  position,
  PositionProps,
  right,
  RightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  top,
  TopProps,
  width,
  WidthProps,
  zIndex,
  ZIndexProps,
} from 'styled-system'
import styled, { css } from 'styled-components'

export type Props = React.HTMLAttributes<HTMLDivElement> &
  AlignItemsProps &
  AlignSelfProps &
  BorderColorProps &
  BorderProps &
  BorderRadiusProps &
  BottomProps &
  ColorProps &
  DisplayProps &
  FlexDirectionProps &
  FlexProps &
  FontSizeProps &
  HeightProps &
  JustifyContentProps &
  LeftProps &
  LineHeightProps &
  MaxHeightProps &
  MaxWidthProps &
  MinHeightProps &
  MinWidthProps &
  PositionProps &
  RightProps &
  SpaceProps &
  TextAlignProps &
  TopProps &
  WidthProps &
  ZIndexProps

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

export const Box = styled.div<Props>`
  ${mixin}
`
