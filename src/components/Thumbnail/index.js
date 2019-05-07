import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

import Box from 'components/UI/Box'

const Container = styled(Box)`
  background-color: lightgray;
  vertical-align: bottom;
  overflow: hidden;
  border-radius: 3px;

  ${props =>
    props.mode === 'error' &&
    `
    position: relative;
    border: 1px solid lightgray;
    background-color: white;
  `}
`

const Image = styled.img`
  vertical-align: bottom;
  opacity: 0;
  transition: opacity 0.125s;

  ${props =>
    props.mode === 'ready' &&
    `
    opacity: 1;
  `}
`

export default ({ image, ...rest }) => {
  const [mode, setMode] = useState('loading')

  const handleLoad = useCallback(() => setMode('ready'), [])
  const handleError = useCallback(() => setMode('error'), [])

  return (
    <Container
      mode={mode}
      width={image.resized.width}
      height={image.resized.height}
    >
      <Image
        mode={mode}
        src={image.resized.urls._2x}
        srcSet={`${image.resized.urls._1x} 1x, ${image.resized.urls._2x} 2x`}
        alt={image.title}
        width={image.resized.width}
        height={image.resized.height}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </Container>
  )
}
