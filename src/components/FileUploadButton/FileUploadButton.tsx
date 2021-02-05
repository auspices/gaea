import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { FilesUploader } from '../FilesUploader'
import {
  Box,
  boxMixin,
  BUTTON,
  buttonFocusMixin,
  buttonMixin,
  Modal,
  Plus,
  themeGet,
  Tooltip,
  useAlerts,
} from '@auspices/eos'
import { errorMessage } from '../../util/errors'
import { Z } from '../../util/zIndexes'

const FileInput = styled.input.attrs({ id: 'file' })`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  &:focus + label {
    ${buttonFocusMixin}
  }
`

const Upload = styled.label.attrs({
  ...BUTTON,
  py: 0,
  for: 'file',
})`
  ${boxMixin}
  ${buttonMixin}
  border: 0;
  border-left: 1px solid ${themeGet('primary')};
  cursor: pointer;
`

type FileUploadButtonProps = {
  onUpload(url: string): Promise<any>
  onComplete?(): void
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onUpload,
  onComplete,
  ...rest
}) => {
  const { sendNotification, sendError } = useAlerts()

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [uploadingFiles, setUploadingFIles] = useState<File[]>([])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setAcceptedFiles([...event.target.files])
        setUploadingFIles([...event.target.files])
      }
    },
    []
  )

  const handleUpload = useCallback(
    async ({ url, file }: { url: string; file: File }) => {
      try {
        onUpload(url)
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }

      const filename = file.name.substring(
        file.name.length - 15,
        file.name.length
      )

      sendNotification({ body: `${filename} added successfully` })

      setUploadingFIles((prevUploadingFiles) => {
        return prevUploadingFiles.filter(
          (prevFile) => prevFile.name !== file.name
        )
      })
    },
    [onUpload, sendError, sendNotification]
  )

  return (
    <>
      <Tooltip
        label="drop or click to add files"
        placement="left"
        distance={10}
      >
        <Box display="flex" height="auto">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleChange}
            multiple
          />

          <Upload py={0} {...rest}>
            <Plus size={6} strokeWidth="1px" />
          </Upload>
        </Box>
      </Tooltip>

      {uploadingFiles.length > 0 && (
        <Modal overlay zIndex={Z.FILE_DROPZONE}>
          <FilesUploader files={acceptedFiles} onUpload={handleUpload} />
        </Modal>
      )}
    </>
  )
}
