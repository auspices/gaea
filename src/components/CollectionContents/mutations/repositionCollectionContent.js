import gql from 'graphql-tag'

export const repositionCollectionContentMutation = gql`
  mutation RepositionCollectionContent(
    $contentId: ID!
    $action: ReorderAction!
    $insertAt: Int!
  ) {
    repositionCollectionContent(
      input: { contentId: $contentId, action: $action, insertAt: $insertAt }
    ) {
      collection {
        __typename
        id
      }
    }
  }
`
