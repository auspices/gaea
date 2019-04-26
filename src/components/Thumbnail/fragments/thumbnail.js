import gql from 'graphql-tag'

export default gql`
  fragment Thumbnail on Image {
    __typename
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
