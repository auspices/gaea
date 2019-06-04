import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background-color: ${({ mode }) =>
    ({
      loading: 'lightgray',
      resting: 'transparent',
      error: 'red',
    }[mode])};
`

export const ContentEntityImage = ({ image }) => {
  const [mode, setMode] = useState('loading')

  const handleLoad = useCallback(() => setMode('resting'), [])
  const handleError = useCallback(() => setMode('error'), [])

  return (
    <Img
      mode={mode}
      src={image.resized.urls._1x}
      srcSet={`${image.resized.urls._1x} 1x, ${image.resized.urls._2x} 2x`}
      alt={image.title}
      width={image.resized.width}
      height={image.resized.height}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}
