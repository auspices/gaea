import React from 'react'
import styled from 'styled-components'

import { Box } from 'components/UI/Box'

const Container = styled(Box)`
  color: blue;
`

export const CollectionContentEntityLink = ({ link, ...rest }) => {
  return <Container {...rest}>{link.name}</Container>
}
