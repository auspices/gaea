import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { graphql } from 'react-apollo'

import addToCollectionMutation from 'components/AddToCollection/mutations/addToCollection'

import { FilesUploader } from 'components/FilesUploader'
import { WithAlerts } from 'components/Alerts'

const Container = styled.div`
  ${props => `display: ${{ resting: 'none', active: 'block' }[props.mode]};`}
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`

export const SUPPORTED_UPLOAD_TYPES = {
  'image/jpeg': 'JPEG',
  'image/gif': 'GIF',
  'image/png': 'PNG',
}

export const CollectionFileDropzone = graphql(addToCollectionMutation, {
  name: 'addToCollection',
})(
  WithAlerts(
    ({ collectionId, per, addToCollection, dispatchAlert, dispatchError }) => {
      const [mode, setMode] = useState('resting')
      const [uploadingFiles, setUploadingFiles] = useState([])

      const handleRejection = useCallback(() => setMode('resting'), [])
      const handleLeave = useCallback(() => setMode('resting'), [])
      const handleDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
          setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            ...acceptedFiles,
          ])

          setMode('active')
        }
      }, [])

      const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDropAccepted: handleDrop,
        onDropRejected: handleRejection,
        onDragLeave: handleLeave,
        noClick: true,
        noKeyboard: true,
        accept: Object.keys(SUPPORTED_UPLOAD_TYPES).join(','),
      })

      const handleUpload = useCallback(
        ({ url, file }) => {
          addToCollection({
            variables: {
              id: collectionId,
              url,
              page: 1,
              per,
            },
          })
            .then(() => {
              const filename = file.path.substring(
                file.path.length - 15,
                file.path.length
              )

              dispatchAlert(`${filename} added successfully`)

              setUploadingFiles(prevUploadingFiles =>
                prevUploadingFiles.filter(prevFile => prevFile !== file)
              )
            })
            .catch(err => dispatchError(err))
        },
        [addToCollection, collectionId, dispatchAlert, dispatchError, per]
      )

      useEffect(() => {
        if (uploadingFiles.length === 0) {
          setMode('resting')
        }
      }, [uploadingFiles])

      // Use `dragenter` event on `window` to trigger the actual drop-zone,
      // instead of the Component's element.
      const showDropZone = () => setMode('active')
      const handleFalseDrops = e => {
        if (!e.dataTransfer.types.includes('Files')) {
          // If you accidently drag some link on the page around, cancel
          setMode('resting')
        }
      }

      useEffect(() => {
        window.addEventListener('dragenter', showDropZone)
        window.addEventListener('drop', handleFalseDrops)
        return () => {
          window.removeEventListener('dragenter', showDropZone)
          window.removeEventListener('drop', handleFalseDrops)
        }
      })

      return (
        <Container {...getRootProps()} mode={mode}>
          <input {...getInputProps()} />

          {acceptedFiles.length > 0 && (
            <FilesUploader
              acceptedFileTypes={SUPPORTED_UPLOAD_TYPES}
              files={acceptedFiles}
              onUpload={handleUpload}
            />
          )}
        </Container>
      )
    }
  )
)
