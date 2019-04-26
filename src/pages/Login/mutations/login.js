import gql from 'graphql-tag'

export default gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      jwt
    }
  }
`
