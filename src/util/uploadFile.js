import axios from 'axios'

export const uploadFile = async ({
  file,
  presignedUploadUrl,
  onFileProgress,
  onFileDone,
}) => {
  await axios.put(presignedUploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: progressEvent_1 => {
      const progress = Math.round(
        (progressEvent_1.loaded * 100) / progressEvent_1.total
      )
      onFileProgress(progress)
    },
  })

  const url = presignedUploadUrl.split('?')[0]

  onFileDone(url)

  return { file, url }
}
