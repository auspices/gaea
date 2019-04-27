import gql from 'graphql-tag'

import headerFragment from 'components/Header/fragments/header'

export default gql`
  query Content($id: ID!, $type: ContentTypes!) {
    me {
      ...Header
    }
    content(id: $id, type: $type) {
      __typename
      ... on Image {
        id
        title
        url
        width
        height
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
  ${headerFragment}
`
