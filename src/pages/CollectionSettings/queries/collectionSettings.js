import gql from 'graphql-tag'

import headerFragment from 'components/Header/fragments/header'

export const collectionSettingsQuery = gql`
  query CollectionSettings($id: ID!) {
    me {
      ...Header
      __typename
      id
      username
      collection(id: $id) {
        __typename
        id
        title
        slug
      }
    }
  }
  ${headerFragment}
`
