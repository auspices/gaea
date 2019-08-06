import React from 'react'
import styled from 'styled-components'

import Box from 'components/UI/Box'

import { ReactComponent as Ellipsis } from './Ellipsis.svg'
import { ReactComponent as Shuffle } from './Shuffle.svg'

const DEFAULT_ICON_SIZE = 6 // 1em

export const ICONS = {
  Ellipsis: <Ellipsis />,
  Shuffle: <Shuffle />,
}

const size = key => props =>
  props.theme.space[props[key] || props.size || DEFAULT_ICON_SIZE] ||
  props[key] ||
  props.size

const Container = styled(Box)`
  display: inline-block;
  position: relative;
  width: ${size('width')};
  height: ${size('height')};
  vertical-align: bottom;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: ${props => props.color};
  }
`

export const Icons = ({ name, ...rest }) => (
  <Container {...rest}>{ICONS[name]}</Container>
)
