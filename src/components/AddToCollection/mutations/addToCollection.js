import gql from 'graphql-tag';

import collectionFragment from '../../../pages/Collection/fragments/collection';

export default gql`
  mutation addToCollection($id: ID!, $sourceUrl: String!, $page: Int, $per: Int) {
    addToCollection(input: { id: $id, sourceUrl: $sourceUrl }) {
      collection {
        ...Collection
      }
    }
  }
  ${collectionFragment}
`;
