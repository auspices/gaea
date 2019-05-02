import axios from 'axios'

export const parseLocationFromS3Response = data => {
  const parser = new DOMParser()
  const parsed = parser.parseFromString(data, 'text/xml')
  return parsed.getElementsByTagName('Location')[0].childNodes[0].nodeValue
}

export const uploadFile = ({
  file,
  presignedUploadUrl,
  onFileProgress,
  onFileDone,
}) => {
  return axios
    .put(presignedUploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: progressEvent => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onFileProgress(progress)
      },
    })
    .then(() => {
      const url = presignedUploadUrl.split('?')[0]
      onFileDone(url)
      return { file, url }
    })
}
