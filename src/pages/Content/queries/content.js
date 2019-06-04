import gql from 'graphql-tag'

import headerFragment from 'components/Header/fragments/header'
import { contentEntityFragment } from 'components/ContentEntity/fragments/contentEntity'

export default gql`
  query Content($id: ID!) {
    me {
      ...Header
    }
    content(id: $id) {
      __typename
      id
      collection {
        __typename
        id
        slug
        title
      }
      entity {
        ...ContentEntity
      }
    }
  }
  ${headerFragment}
  ${contentEntityFragment}
`
