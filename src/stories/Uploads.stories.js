import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import { Container } from 'components/CollectionFileDropzone'
import {
  FilesUploaderContainer,
  FilesUploaderList,
} from 'components/FilesUploader'
import { FileUploadRepresentation } from 'components/FileUpload'

const Foo = () => {
  const [randomProgress, setRandomProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setRandomProgress(Math.random() * Math.floor(100)),
      500
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <Container>
      <FilesUploaderContainer>
        <FilesUploaderList>
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={0} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={7} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={4} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={33} />
          <FileUploadRepresentation
            label="foobar.jpg"
            uploadProgress={66.4342}
          />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={99} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={100} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={24} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={43} />
          <FileUploadRepresentation
            label="foobar.jpg"
            uploadProgress={randomProgress}
          />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={77} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={77} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={77} />
          <FileUploadRepresentation label="foobar.jpg" uploadProgress={77} />
        </FilesUploaderList>
      </FilesUploaderContainer>
    </Container>
  )
}
storiesOf('Uploads', module).add('default', () => <Foo />)
