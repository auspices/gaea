import gql from 'graphql-tag'

export const filesUploaderQuery = gql`
  query FilesUploader($fileTypes: [SupportedUpload!]!) {
    me {
      __typename
      id
      presignedUploadUrls(types: $fileTypes)
    }
  }
`
