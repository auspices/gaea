import gql from 'graphql-tag'

export const contentSettingsFragment = gql`
  fragment ContentSettings on Content {
    __typename
    id
    metadata
  }
`
