import axios from 'axios'

export type UploadFile = {
  file: File
  presignedUploadUrl: string
  onFileProgress(progress: number): void
  onFileDone(url: string): void
}

export const uploadFile = async ({
  file,
  presignedUploadUrl,
  onFileProgress,
  onFileDone,
}: UploadFile) => {
  await axios.put(presignedUploadUrl, file, {
    headers: { 'Content-Type': file.type },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      onFileProgress(progress)
    },
  })

  const url = presignedUploadUrl.split('?')[0]

  onFileDone(url)

  return { file, url }
}
