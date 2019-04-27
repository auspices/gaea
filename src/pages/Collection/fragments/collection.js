import gql from 'graphql-tag'

import thumbnailFragment from '../../../components/Thumbnail/fragments/thumbnail'

export default gql`
  fragment Collection on Collection {
    __typename
    id
    slug
    title
    counts {
      __typename
      contents
    }
    contents(page: $page, per: $per) {
      __typename
      ... on Image {
        ...Thumbnail
      }
    }
  }
  ${thumbnailFragment}
`
