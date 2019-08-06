import gql from 'graphql-tag'

export const sampleCollectionContentQuery = gql`
  query SampleCollectionContent($id: ID!) {
    me {
      id
      slug
      collection(id: $id) {
        id
        contents: sample(amount: 1) {
          id
        }
      }
    }
  }
`
