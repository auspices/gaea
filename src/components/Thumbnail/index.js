import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  background-color: lightgray;
  vertical-align: bottom;
  overflow: hidden;
  border-radius: 4px;
`

export default ({ image, ...rest }) => (
  <Image
    src={image.resized.urls._2x}
    srcSet={`${image.resized.urls._1x} 1x, ${image.resized.urls._2x} 2x`}
    alt={image.title}
    width={image.resized.width}
    height={image.resized.height}
    {...rest}
  />
)
