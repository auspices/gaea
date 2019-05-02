import gql from 'graphql-tag'

export const filesUploaderQuery = gql`
  query FilesUploader($fileTypes: [SupportedUploadTypes!]!) {
    me {
      __typename
      id
      presignedUploadUrls(types: $fileTypes)
    }
  }
`
