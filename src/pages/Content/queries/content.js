import gql from 'graphql-tag'

import headerFragment from 'components/Header/fragments/header'
import { contentEntityFragment } from 'components/ContentEntity/fragments/contentEntity'
import { contentEntityHeaderFragment } from 'components/ContentEntityHeader/fragments/contentEntityHeader'

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
        ...ContentEntityHeader
        ...ContentEntity
      }
    }
  }
  ${headerFragment}
  ${contentEntityFragment}
  ${contentEntityHeaderFragment}
`
