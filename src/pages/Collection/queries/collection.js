import gql from 'graphql-tag';

import collectionFragment from '../fragments/collection';

export default gql`
  query Collection($id: ID!, $page: Int, $per: Int) {
    me {
      __typename
      id
      username
      collection(id: $id) {
        ...Collection
      }
    }
  }
  ${collectionFragment}
`;
