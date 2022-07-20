import React from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { Box, BoxProps, Stack } from '@auspices/eos'
import { FileUpload } from './FileUpload'
import {
  FilesUploaderQuery,
  FilesUploaderQueryVariables,
} from '../generated/graphql'

export const FILES_UPLOADER_QUERY = gql`
  query FilesUploaderQuery($uploads: [UploadInput!]!) {
    me {
      id
      presignedUploadUrls(uploads: $uploads)
    }
  }
`

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100vw;
  height: 100vh;
`

const List = styled(Box).attrs({
  p: 6,
})`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

export type FilesUploaderProps = BoxProps & {
  files: File[]
  onUpload(params: { url: string; file: File }): void
}

export const FilesUploader: React.FC<FilesUploaderProps> = ({
  files,
  onUpload,
  ...rest
}) => {
  const { data, error, loading } = useQuery<
    FilesUploaderQuery,
    FilesUploaderQueryVariables
  >(FILES_UPLOADER_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      uploads: files.map((file) => ({
        name: file.name,
        type: file.type,
      })),
    },
  })

  if (error) {
    throw error
  }

  if (loading || !data) return null

  const uploads: [string, File][] = data.me.presignedUploadUrls.map(
    (url, i) => [url, files[i]]
  )

  return (
    <Container {...rest}>
      <List>
        <Stack>
          {uploads.map(([presignedUploadUrl, file], i) => (
            <FileUpload
              key={file.name + i}
              file={file}
              presignedUploadUrl={presignedUploadUrl}
              onUpload={onUpload}
            />
          ))}
        </Stack>
      </List>
    </Container>
  )
}
