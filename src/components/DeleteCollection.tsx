import React, { useCallback, useState } from 'react'
import { gql } from 'graphql-tag'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {
  Button,
  ButtonProps,
  Cell,
  Input,
  Stack,
  useAlerts,
} from '@auspices/eos'
import { useHrefs } from '../hooks'
import { errorMessage } from '../util/errors'
import { DeleteCollectionMutation } from '../generated/graphql'
import { AUTOFOCUS } from '../util/autoFocus'

export const DELETE_COLLECTION_MUTATION = gql`
  mutation DeleteCollectionMutation($id: ID!) {
    deleteCollection(input: { id: $id }) {
      __typename
    }
  }
`

enum Mode {
  Resting,
  Confirm,
  Deleting,
}

type DeleteCollectionProps = ButtonProps & {
  id: string
  confirmation: string
}

export const DeleteCollection: React.FC<DeleteCollectionProps> = ({
  id,
  confirmation,
  ...rest
}) => {
  const [deleteCollection] = useMutation<DeleteCollectionMutation>(
    DELETE_COLLECTION_MUTATION
  )

  const navigate = useNavigate()
  const hrefs = useHrefs()

  const { sendError, sendNotification } = useAlerts()

  const [mode, setMode] = useState(Mode.Resting)
  const [input, setInput] = useState('')

  const handleDelete = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (input.toLowerCase() !== confirmation.toLowerCase()) return

      try {
        await deleteCollection({ variables: { id } })
        sendNotification({ body: 'deleted successfully' })
        navigate(hrefs.collections())
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }
    },
    [
      confirmation,
      deleteCollection,
      navigate,
      hrefs,
      id,
      input,
      sendError,
      sendNotification,
    ]
  )

  const handleConfirm = useCallback(() => setMode(Mode.Confirm), [])
  const handleCancel = useCallback(() => setMode(Mode.Resting), [])
  const handleChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      setInput(value),
    []
  )

  return (
    <>
      {mode !== Mode.Confirm && (
        <Button
          color="danger"
          borderColor="danger"
          zIndex={1}
          onClick={handleConfirm}
          {...rest}
        >
          delete collection
        </Button>
      )}

      {mode === Mode.Confirm && (
        <form onSubmit={handleDelete}>
          <Stack>
            <Cell
              color="danger"
              borderColor="danger"
              alignItems="center"
              zIndex={1}
            >
              are you sure?
            </Cell>

            <Input
              color="danger"
              borderColor="danger"
              placeholder={`type “${confirmation.toLowerCase()}” to confirm`}
              onChange={handleChange}
              autoFocus={AUTOFOCUS}
            />

            <Stack direction="horizontal">
              <Button
                color="danger"
                borderColor="danger"
                flex="1"
                type="reset"
                onClick={handleCancel}
              >
                cancel
              </Button>

              <Button
                color="danger"
                borderColor="danger"
                flex="1"
                disabled={input.toLowerCase() !== confirmation.toLowerCase()}
                type="submit"
              >
                confirm
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </>
  )
}
