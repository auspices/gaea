import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { Box, BoxProps, Stack } from '@auspices/eos'
import { FileUpload } from '../../components/FileUpload'
import {
  FilesUploaderQuery,
  FilesUploaderQueryVariables,
} from '../../generated/types/FilesUploaderQuery'
import { SupportedUpload } from '../../generated/types/globalTypes'

export const FILES_UPLOADER_QUERY = gql`
  query FilesUploaderQuery($fileTypes: [SupportedUpload!]!) {
    me {
      id
      presignedUploadUrls(types: $fileTypes)
    }
  }
`

export const SUPPORTED_UPLOAD_TYPES = {
  'image/jpeg': 'JPEG',
  'image/gif': 'GIF',
  'image/png': 'PNG',
} as const

export const ACCEPT = Object.keys(SUPPORTED_UPLOAD_TYPES).join(',')

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
  const fileTypes = files.map(
    (file) =>
      SUPPORTED_UPLOAD_TYPES[
        file.type as keyof typeof SUPPORTED_UPLOAD_TYPES
      ] as SupportedUpload
  )

  const { data, error, loading } = useQuery<
    FilesUploaderQuery,
    FilesUploaderQueryVariables
  >(FILES_UPLOADER_QUERY, {
    fetchPolicy: 'network-only',
    variables: { fileTypes },
  })

  if (error) {
    throw error
  }

  if (loading || !data) return null

  const uploads: [
    string,
    File
  ][] = data.me.presignedUploadUrls.map((url, i) => [url, files[i]])

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
