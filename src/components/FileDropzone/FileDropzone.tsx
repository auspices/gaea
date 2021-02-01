import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Modal, useAlerts } from '@auspices/eos'
import { ACCEPT, FilesUploader } from '../FilesUploader'
import { errorMessage } from '../../util/errors'
import { Z } from '../../util/zIndexes'

enum Mode {
  Resting,
  Pending,
  Uploading,
}

type FileDropzoneProps = {
  onUpload(url: string): Promise<any>
  onComplete?(): void
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onUpload,
  onComplete,
}) => {
  const { sendNotification, sendError } = useAlerts()

  const [mode, setMode] = useState(Mode.Resting)
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([])

  const handleRejection = useCallback(() => setMode(Mode.Resting), [])
  const handleLeave = useCallback(() => setMode(Mode.Resting), [])

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadingFiles((prevUploadingFiles) => [
        ...prevUploadingFiles,
        ...acceptedFiles,
      ])
      setMode(Mode.Uploading)
    }
  }, [])

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDropAccepted: handleDrop,
    onDropRejected: handleRejection,
    onDragLeave: handleLeave,
    noClick: true,
    noKeyboard: true,
    accept: ACCEPT,
  })

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

      setUploadingFiles((prevUploadingFiles) => {
        return prevUploadingFiles.filter(
          (prevFile) => prevFile.name !== file.name
        )
      })
    },
    [onUpload, sendError, sendNotification]
  )

  useEffect(() => {
    if (mode === Mode.Uploading && uploadingFiles.length === 0) {
      setMode(Mode.Resting)
      onComplete && onComplete()
    }
  }, [mode, onComplete, uploadingFiles])

  // Use `dragenter` event on `window` to trigger the actual drop-zone,
  // instead of the Component's element.
  const showDropZone = (event: DragEvent) => {
    // Prevent non-file drags from registering
    if (!event.dataTransfer?.types.includes('Files')) return

    setMode(Mode.Pending)
  }

  useEffect(() => {
    window.addEventListener('dragenter', showDropZone)
    return () => {
      window.removeEventListener('dragenter', showDropZone)
    }
  })

  if (mode === Mode.Resting) return null

  return (
    <Modal {...getRootProps()} overlay zIndex={Z.FILE_DROPZONE}>
      <input {...getInputProps()} />

      {acceptedFiles.length > 0 && (
        <FilesUploader files={acceptedFiles} onUpload={handleUpload} />
      )}
    </Modal>
  )
}
