import gql from 'graphql-tag'

export const contentEntityImageFragment = gql`
  fragment ContentEntityImage on Image {
    id
    title
    url
    width
    height
    resized(width: 900, height: 900) {
      width
      height
      urls {
        _1x
        _2x
      }
    }
  }
`
