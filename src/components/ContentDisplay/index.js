import React, { useState } from 'react'
import styled from 'styled-components'

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background-color: ${props =>
    ({
      loading: 'lightgray',
      resting: 'transparent',
      error: 'red',
    }[props.mode])};
`

export const ContentDisplay = ({ content }) => {
  const [mode, setMode] = useState(
    content.__typename === 'Image' ? 'loading' : 'resting'
  )

  switch (content.__typename) {
    case 'Image':
      return (
        <Img
          mode={mode}
          src={content.resized.urls._1x}
          srcSet={`${content.resized.urls._1x} 1x, ${
            content.resized.urls._2x
          } 2x`}
          alt={content.title}
          width={content.resized.width}
          height={content.resized.height}
          onLoad={() => setMode('resting')}
          onError={() => setMode('error')}
        />
      )
    default:
      return content.__typename
  }
}
