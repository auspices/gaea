import gql from 'graphql-tag';

import headerFragment from 'components/Header/fragments/header';
import collectionStubFragment from 'components/CollectionStub/fragments/collectionStub';

export default gql`
  query Collections($page: Int) {
    me {
      ...Header
      collections(page: $page) {
        ...CollectionStub
      }
    }
  }
  ${headerFragment}
  ${collectionStubFragment}
`;
