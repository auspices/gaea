import gql from 'graphql-tag';

export default gql`
  fragment CollectionStub on Collection {
    __typename
    id: slug
    title
    updatedAt
    counts {
      __typename
      contents
    }
  }
`;
