import gql from 'graphql-tag'

export const repositionCollectionContentMutation = gql`
  mutation RepositionCollectionContent(
    $connection: ConnectionInput!
    $action: ReorderAction!
    $insertAt: Int!
  ) {
    repositionCollectionContent(
      input: { connection: $connection, action: $action, insertAt: $insertAt }
    ) {
      collection {
        __typename
        id
      }
    }
  }
`
