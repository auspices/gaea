import React from 'react'
import styled from 'styled-components'

import { Box } from '../../../../components/UI/Box'

const Container = styled(Box).attrs({
  fontSize: 0,
})`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
  max-height: 15em;
  margin: 1em;
  padding: 0.5em;
  border-radius: 0.25em;
  overflow: hidden;

  ${props =>
    props.length > 150 &&
    `
      &:after {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 4em;
        background: linear-gradient(rgba(255, 255, 255, 0.001) 0%, white 100%);
      }
  `}
`

export const CollectionContentEntityText = ({ text }) => {
  return <Container length={text.body.length}>{text.body}</Container>
}
