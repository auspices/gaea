import React from 'react'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Box, BoxProps } from '@auspices/eos'

export const ICONS = {
  Ellipsis: (
    <svg viewBox="0 0 20 20">
      <path
        d="M3.936,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021S5.957,11.116,5.957,10
    S5.052,7.979,3.936,7.979z M3.936,11.011c-0.558,0-1.011-0.452-1.011-1.011s0.453-1.011,1.011-1.011S4.946,9.441,4.946,10
    S4.494,11.011,3.936,11.011z M16.064,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021s2.021-0.905,2.021-2.021
    S17.181,7.979,16.064,7.979z M16.064,11.011c-0.559,0-1.011-0.452-1.011-1.011s0.452-1.011,1.011-1.011S17.075,9.441,17.075,10
    S16.623,11.011,16.064,11.011z M10,7.979c-1.116,0-2.021,0.905-2.021,2.021S8.884,12.021,10,12.021s2.021-0.905,2.021-2.021
    S11.116,7.979,10,7.979z M10,11.011c-0.558,0-1.011-0.452-1.011-1.011S9.442,8.989,10,8.989S11.011,9.441,11.011,10
    S10.558,11.011,10,11.011z"
      ></path>
    </svg>
  ),
} as const

const Container = styled(Box)`
  display: inline-block;
  position: relative;
  width: ${themeGet('space.5')};
  height: ${themeGet('space.5')};
  vertical-align: bottom;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`

type IconsProps = BoxProps & {
  name: keyof typeof ICONS
  color?: string
}

export const Icons: React.FC<IconsProps> = ({ name, ...rest }) => (
  <Container {...rest}>{ICONS[name]}</Container>
)
