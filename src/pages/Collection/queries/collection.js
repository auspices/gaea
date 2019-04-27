import gql from 'graphql-tag'

import headerFragment from 'components/Header/fragments/header'
import collectionFragment from '../fragments/collection'

export default gql`
  query Collection($id: ID!, $page: Int, $per: Int) {
    me {
      ...Header
      __typename
      id
      username
      collection(id: $id) {
        ...Collection
      }
    }
  }
  ${headerFragment}
  ${collectionFragment}
`
