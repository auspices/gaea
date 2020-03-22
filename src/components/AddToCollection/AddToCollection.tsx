import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button, Input, useAlerts } from '@auspices/eos'
import { usePagination, useRefetch } from '../../hooks'
import { errorMessage } from '../../util/errors'
import { Form, FormProps } from '../Form'
import { FileDropzone } from '../FileDropzone'
import { useHistory } from 'react-router'

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
  const [addToCollection] = useMutation(ADD_TO_COLLECTION_MUTATION)
  const [mode, setMode] = useState(Mode.Resting)
  const [value, setValue] = useState('')
  const [inputKey, setInputKey] = useState(new Date().getTime())

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

  const handleChange = useCallback(
    ({ target: { value } }) => setValue(value),
    []
  )

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

      <Form onSubmit={handleSubmit} {...rest}>
        <Input
          key={inputKey}
          borderWidth={0}
          flex={1}
          placeholder="add to this collection"
          onChange={handleChange}
          disabled={mode === Mode.Adding}
          required
          autoFocus
        />

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
      </Form>
    </>
  )
}
