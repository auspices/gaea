import gql from 'graphql-tag'

import collectionStubFragment from 'components/CollectionStub/fragments/collectionStub'

export default gql`
  mutation createCollection($title: String!) {
    createCollection(input: { title: $title }) {
      collection {
        ...CollectionStub
      }
    }
  }
  ${collectionStubFragment}
`
