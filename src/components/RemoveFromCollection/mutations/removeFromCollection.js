import gql from 'graphql-tag'

import collectionFragment from '../../../pages/Collection/fragments/collection'

export default gql`
  mutation removeFromCollection($contentId: ID!, $page: Int, $per: Int) {
    removeFromCollection(input: { contentId: $contentId }) {
      collection {
        ...Collection
      }
    }
  }
  ${collectionFragment}
`
