import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Box, Button, ClearableInput, Loading, useAlerts } from '@auspices/eos'
import { useContextualRef, usePagination, useRefetch } from '../../hooks'
import { errorMessage } from '../../util/errors'
import { Form, FormProps } from '../Form'
import { FileDropzone } from '../FileDropzone'
import { FileUploadButton } from '../FileUploadButton'
import { useHistory } from 'react-router'
import { AddToCollectionMutation } from '../../generated/types/AddToCollectionMutation'

const ADD_TO_COLLECTION_MUTATION = gql`
  mutation AddToCollectionMutation($id: ID!, $value: String!) {
    addToCollection(input: { id: $id, value: $value }) {
      collection {
        id
      }
    }
  }
`

enum Mode {
  Resting,
  Adding,
  Error,
}

type AddToCollectionProps = FormProps & {
  id: number
}

export const AddToCollection: React.FC<AddToCollectionProps> = ({
  id,
  ...rest
}) => {
  const history = useHistory()
  const { refetch } = useRefetch()
  const { page, per, encode } = usePagination()
  const { sendNotification, sendError } = useAlerts()
  const [addToCollection] = useMutation<AddToCollectionMutation>(
    ADD_TO_COLLECTION_MUTATION
  )
  const [mode, setMode] = useState(Mode.Resting)
  const [value, setValue] = useState('')
  const [inputKey, setInputKey] = useState(new Date().getTime())

  const { setContextualRef } = useContextualRef()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setMode(Mode.Adding)

      try {
        await addToCollection({
          variables: {
            id,
            value,
            page: 1,
            per,
          },
        })
      } catch (err) {
        sendError({ body: errorMessage(err) })
        setMode(Mode.Error)
      }

      refetch()
      sendNotification({ body: 'added successfully' })
      setMode(Mode.Resting)
      setValue('')
      setInputKey(new Date().getTime())

      if (page !== 1) {
        history.push({ search: encode({ page: 1, per }) })
      }
    },
    [
      addToCollection,
      encode,
      history,
      id,
      page,
      per,
      refetch,
      sendError,
      sendNotification,
      value,
    ]
  )

  const handleChange = useCallback((value: string) => setValue(value), [])

  const handleUpload = useCallback(
    async (url: string) => {
      sendNotification({ body: 'processing upload...' })

      try {
        await addToCollection({
          variables: {
            id,
            value: url,
            page: 1,
            per,
          },
        })
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }

      refetch()
      sendNotification({ body: 'added successfully' })
    },
    [addToCollection, id, per, refetch, sendError, sendNotification]
  )

  const handleComplete = useCallback(() => {
    setInputKey(new Date().getTime())
  }, [])

  return (
    <>
      <FileDropzone
        key={inputKey}
        onUpload={handleUpload}
        onComplete={handleComplete}
      />

      <Box position="relative" flex={1} {...rest}>
        <Form alignItems="stretch" onSubmit={handleSubmit}>
          <Loading
            px={0}
            py={0}
            borderWidth={0}
            flex={1}
            loading={mode === Mode.Adding}
          >
            <ClearableInput
              ref={setContextualRef('collectionInput')}
              key={inputKey}
              borderWidth={0}
              flex={1}
              placeholder="add to this collection"
              onChange={handleChange}
              disabled={mode === Mode.Adding}
              required
              autoFocus
              title=""
              autoComplete="off"
            />
          </Loading>

          {value !== '' && (
            <Button
              borderWidth={0}
              borderLeft="1px solid"
              type="submit"
              disabled={mode === Mode.Adding}
              title="or press <enter>"
            >
              {
                {
                  [Mode.Resting]: 'add',
                  [Mode.Adding]: 'add',
                  [Mode.Error]: 'error',
                }[mode]
              }
            </Button>
          )}

          <FileUploadButton
            key={inputKey}
            onUpload={handleUpload}
            onComplete={handleComplete}
          />
        </Form>
      </Box>
    </>
  )
}
