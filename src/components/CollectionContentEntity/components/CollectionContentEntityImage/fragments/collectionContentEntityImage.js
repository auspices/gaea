import gql from 'graphql-tag'

export const collectionContentEntityImageFragment = gql`
  fragment CollectionContentEntityImage on Image {
    id
    title
    resized(width: 200, height: 200) {
      width
      height
      urls {
        _1x
        _2x
      }
    }
  }
`
