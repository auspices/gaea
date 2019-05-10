import React from 'react'
import { Query } from 'react-apollo'
import { zip } from 'lodash'
import styled from 'styled-components'

import { filesUploaderQuery } from './queries/filesUploader'

import Box from 'components/UI/Box'
import { WithAlerts } from 'components/Alerts'
import { FileUpload } from 'components/FileUpload'

export const FilesUploaderContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  height: 100%;
`

export const FilesUploaderList = styled(Box).attrs({
  p: 6,
})`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

export const FilesUploadList = ({ uploads, onUpload }) => {
  return (
    <FilesUploaderContainer>
      <FilesUploaderList>
        {uploads.map(([presignedUploadUrl, file]) => (
          <FileUpload
            key={file.path}
            file={file}
            presignedUploadUrl={presignedUploadUrl}
            onUpload={onUpload}
          />
        ))}
      </FilesUploaderList>
    </FilesUploaderContainer>
  )
}

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

          return <FilesUploadList uploads={uploads} onUpload={onUpload} />
        }}
      </Query>
    )
  }
)
