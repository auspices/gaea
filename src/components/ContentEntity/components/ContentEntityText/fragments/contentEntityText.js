import gql from 'graphql-tag'

export const contentEntityTextFragment = gql`
  fragment ContentEntityText on Text {
    id
    body
  }
`
