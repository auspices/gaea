import gql from 'graphql-tag'

export const updateEntityMutation = gql`
  mutation updateEntity($id: ID!, $type: EntityTypes!, $value: String!) {
    updateEntity(input: { id: $id, value: $value, type: $type }) {
      entity {
        __typename
      }
    }
  }
`
