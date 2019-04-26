import gql from 'graphql-tag'

export default gql`
  query Content($id: ID!, $type: ContentTypes!) {
    content(id: $id, type: $type) {
      __typename
      ... on Image {
        id
        title
        resized(width: 750, height: 750) {
          width
          height
          urls {
            _1x
            _2x
          }
        }
      }
    }
  }
`
