import React from 'react'
import styled from 'styled-components'

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background-color: lightgray;
`

export const ContentDisplay = ({ content }) => {
  switch (content.__typename) {
    case 'Image':
      return (
        <Img
          src={content.resized.urls._1x}
          srcSet={`${content.resized.urls._1x} 1x, ${
            content.resized.urls._2x
          } 2x`}
          alt={content.title}
          width={content.resized.width}
          height={content.resized.height}
        />
      )
    default:
      return content.__typename
  }
}
