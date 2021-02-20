import React, { useCallback, useEffect, useState } from 'react'
import { Upload } from '@auspices/eos'
import { uploadFile } from '../util/uploadFile'

export type FileUploadProps = {
  presignedUploadUrl: string
  file: File
  onUpload({ file, url }: { file: File; url: string }): void
}

export const FileUpload: React.FC<FileUploadProps> = ({
  presignedUploadUrl,
  file,
  onUpload,
  ...rest
}) => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)

  const handleUploadDone = useCallback(
    (url: string) => onUpload({ url, file }),
    [file, onUpload]
  )

  useEffect(() => {
    uploadFile({
      presignedUploadUrl,
      file,
      onFileProgress: setUploadProgress,
      onFileDone: handleUploadDone,
    }).catch((err) => {
      setError(err)
    })
  }, [file, handleUploadDone, onUpload, presignedUploadUrl])

  if (error) {
    throw error
  }

  return <Upload label={file.name} progress={uploadProgress} {...rest} />
}
