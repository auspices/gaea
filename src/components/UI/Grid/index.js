import styled from 'styled-components'

import Box from '../Box'

const Container = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  > a {
    width: 12.5em;
    height: 12.5em;
  }
`

export default Container
