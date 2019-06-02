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

export const ContentEntity = ({ entity }) => {
  const [mode, setMode] = useState(
    entity.__typename === 'Image' ? 'loading' : 'resting'
  )

  switch (entity.__typename) {
    case 'Image':
      return (
        <Img
          mode={mode}
          src={entity.resized.urls._1x}
          srcSet={`${entity.resized.urls._1x} 1x, ${
            entity.resized.urls._2x
          } 2x`}
          alt={entity.title}
          width={entity.resized.width}
          height={entity.resized.height}
          onLoad={() => setMode('resting')}
          onError={() => setMode('error')}
        />
      )
    default:
      return entity.__typename
  }
}
