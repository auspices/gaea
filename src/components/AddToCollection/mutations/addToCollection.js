import gql from 'graphql-tag'

import collectionFragment from '../../../pages/Collection/fragments/collection'

export default gql`
  mutation addToCollection($id: ID!, $value: String!, $page: Int, $per: Int) {
    addToCollection(input: { id: $id, value: $value }) {
      collection {
        ...Collection
      }
    }
  }
  ${collectionFragment}
`
