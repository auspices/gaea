import React from 'react'
import { Query } from 'react-apollo'
import { zip } from 'lodash'
import styled from 'styled-components'

import { filesUploaderQuery } from './queries/filesUploader'

import Box from 'components/UI/Box'
import { WithAlerts } from 'components/Alerts'
import { FileUpload } from 'components/FileUpload'

const Container = styled(Box).attrs({
  p: 6,
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const FilesUploader = WithAlerts(
  ({ files, acceptedFileTypes, onUpload, dispatchError }) => {
    const fileTypes = files.map(file => acceptedFileTypes[file.type])

    return (
      <Query
        query={filesUploaderQuery}
        variables={{ fileTypes }}
        fetchPolicy="network-only"
        onError={dispatchError}
      >
        {({ data, error, loading }) => {
          if (loading || error) return null

          const {
            me: { presignedUploadUrls },
          } = data

          const uploads = zip(presignedUploadUrls, files)

          return (
            <Container>
              {uploads.map(([presignedUploadUrl, file]) => (
                <FileUpload
                  key={file.path}
                  file={file}
                  presignedUploadUrl={presignedUploadUrl}
                  onUpload={onUpload}
                  mb={4}
                />
              ))}
            </Container>
          )
        }}
      </Query>
    )
  }
)
