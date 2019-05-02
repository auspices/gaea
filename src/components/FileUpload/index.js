import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'

import { uploadFile } from 'util/uploadFile'

import Box from 'components/UI/Box'

const Container = styled(Box).attrs({
  py: 6,
  px: 7,
})`
  position: relative;
  width: 100%;
`

const ProgressBar = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${props => props.progress}%;
  z-index: 0;
  background-color: ${props => `
    ${props.progress === 100 ? 'rgba(255, 255, 255, 0.5)' : 'white'}
  `};
`

const Label = styled(Box).attrs({
  fontSize: 2,
})`
  position: relative;
  z-index: 1;
`

export const FileUpload = ({ presignedUploadUrl, file, onUpload, ...rest }) => {
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleUploadDone = useCallback(url => onUpload({ url, file }), [
    file,
    onUpload,
  ])

  useEffect(() => {
    uploadFile({
      presignedUploadUrl,
      file,
      onFileProgress: setUploadProgress,
      onFileDone: handleUploadDone,
    }).catch(err => {
      console.error(err)
    })
  }, [file, handleUploadDone, onUpload, presignedUploadUrl])

  return (
    <Container {...rest}>
      <Label>
        {file.path}: {uploadProgress}%
      </Label>

      <ProgressBar progress={uploadProgress} />
    </Container>
  )
}
