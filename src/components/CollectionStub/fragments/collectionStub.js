import gql from 'graphql-tag'

export default gql`
  fragment CollectionStub on Collection {
    __typename
    id
    slug
    title
    updatedAt(relative: true)
    counts {
      __typename
      contents
    }
  }
`
