import React, { useCallback, useEffect, useState } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Box, Button, ClearableInput, Loading, useAlerts } from '@auspices/eos'
import { useContextualRef, useHrefs, usePagination, useRefetch } from '../hooks'
import { errorMessage } from '../util/errors'
import { Form, FormProps } from './Form'
import { FileDropzone } from './FileDropzone'
import { FileUploadButton } from './FileUploadButton'
import { useHistory } from 'react-router'
import { AddToCollectionMutation } from '../generated/types/AddToCollectionMutation'
import { AUTOFOCUS } from '../util/autoFocus'

const ADD_TO_COLLECTION_MUTATION = gql`
  mutation AddToCollectionMutation($id: ID!, $value: String!) {
    addToCollection(input: { id: $id, value: $value }) {
      collection {
        id
      }
      content {
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
  const hrefs = useHrefs()
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
  const [goToContent, setGoToContent] = useState(false)

  const { setContextualRef } = useContextualRef()

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Meta') setGoToContent(true)
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Meta') setGoToContent(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const addInput = useCallback(async () => {
    setMode(Mode.Adding)

    try {
      const { data } = await addToCollection({
        variables: {
          id,
          value,
          page: 1,
          per,
        },
      })

      sendNotification({ body: 'added successfully' })
      setMode(Mode.Resting)
      setValue('')
      setInputKey(new Date().getTime())

      if (goToContent) {
        history.push(hrefs.content(data?.addToCollection?.content.id!))
        return
      }

      refetch()

      if (page !== 1) {
        history.push({ search: encode({ page: 1, per }) })
      }
    } catch (err) {
      sendError({ body: errorMessage(err) })
      setMode(Mode.Error)
    }
  }, [
    addToCollection,
    encode,
    goToContent,
    history,
    hrefs,
    id,
    page,
    per,
    refetch,
    sendError,
    sendNotification,
    value,
  ])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      addInput()
    },
    [addInput]
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

        sendNotification({ body: 'added successfully' })
        refetch()
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }
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
              onKeyDown={(event) => {
                // <Meta> supresses the form submission by default.
                // Force it on <Enter>.
                if (event.key === 'Enter' && value !== '') {
                  addInput()
                }
              }}
              disabled={mode === Mode.Adding}
              required
              autoFocus={AUTOFOCUS}
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
                  [Mode.Resting]: goToContent ? 'add + go' : 'add',
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
