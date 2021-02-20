import { Box, color } from '@auspices/eos'
import styled from 'styled-components'

export const FadeOut = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    to top,
    transparent 0%,
    ${color('background')} 33%
  );
`
