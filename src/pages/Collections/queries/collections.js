import gql from 'graphql-tag'

import headerFragment from '../../../components/Header/fragments/header'
import collectionStubFragment from '../../../components/CollectionStub/fragments/collectionStub'

export default gql`
  query Collections($page: Int, $per: Int) {
    me {
      ...Header
      counts {
        __typename
        collections
      }
      collections(page: $page, per: $per) {
        ...CollectionStub
      }
    }
  }
  ${headerFragment}
  ${collectionStubFragment}
`
