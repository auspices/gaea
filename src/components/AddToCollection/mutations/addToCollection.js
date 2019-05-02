import gql from 'graphql-tag'

import collectionFragment from 'pages/Collection/fragments/collection'

export default gql`
  mutation addToCollection($id: ID!, $url: String!, $page: Int, $per: Int) {
    addToCollection(input: { id: $id, url: $url }) {
      collection {
        ...Collection
      }
    }
  }
  ${collectionFragment}
`
