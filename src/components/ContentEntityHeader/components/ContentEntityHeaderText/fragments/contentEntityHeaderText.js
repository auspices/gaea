import gql from 'graphql-tag'

export const contentEntityHeaderTextFragment = gql`
  fragment ContentEntityHeaderText on Text {
    id
    body
  }
`
