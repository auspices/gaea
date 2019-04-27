import gql from 'graphql-tag'

export default gql`
  fragment Header on User {
    __typename
    id
    slug
    username
  }
`
