import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'

import { uploadFile } from 'util/uploadFile'

import Box from 'components/UI/Box'

const Container = styled(Box).attrs({
  px: 5,
  py: 3,
  mb: 1,
})`
  position: relative;
  width: 100%;
  overflow: hidden;
  ${props =>
    props.progress >= 100 &&
    `
    opacity: 0.5;
  `}
`

const ProgressBar = styled(Box).attrs({})`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-left: 1px solid white;
  background-color: white;
  width: 100%;
  transform: translateX(-${props => 100 - props.progress}%);
  transition: transform 0.125s;
`

const Label = styled(Box).attrs({
  fontSize: 1,
})`
  position: relative;
  z-index: 1;
  color: black;
`

export const FileUploadRepresentation = ({
  label,
  uploadProgress,
  ...rest
}) => {
  return (
    <Container progress={uploadProgress} {...rest}>
      <Label>
        {label}: {Math.ceil(uploadProgress)}%
      </Label>

      <ProgressBar progress={uploadProgress} />
    </Container>
  )
}

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
    <FileUploadRepresentation
      label={file.path}
      uploadProgress={uploadProgress}
      {...rest}
    />
  )
}
