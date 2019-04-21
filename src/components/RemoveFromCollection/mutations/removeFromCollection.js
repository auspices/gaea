import gql from 'graphql-tag';

import collectionFragment from '../../../pages/Collection/fragments/collection';

export default gql`
  mutation removeFromCollection($collectionId: ID!, $contentId: ID!, $contentType: ContentTypes!, $page: Int, $per: Int) {
    removeFromCollection(input: {connection: {contentId: $contentId, contentType: $contentType, collectionId: $collectionId}}) {
      collection {
        ...Collection
      }
    }
  }
  ${collectionFragment}
`;
