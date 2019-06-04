import gql from 'graphql-tag'

export const contentEntityHeaderImageFragment = gql`
  fragment ContentEntityHeaderImage on Image {
    id
    url
    width
    height
  }
`
