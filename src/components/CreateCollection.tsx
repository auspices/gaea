import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { Button, ClearableInput, useAlerts, useConfirm } from '@auspices/eos'
import { useContextualRef, useHrefs } from '../hooks'
import { errorMessage } from '../util/errors'
import { Form } from './Form'
import { COLLECTION_STUB_FRAGMENT } from './CollectionStub'
import {
  CreateCollectionMutation,
  CreateCollectionMutationVariables,
} from '../generated/types/CreateCollectionMutation'
import { Z } from '../util/zIndexes'
import { AUTOFOCUS } from '../util/autoFocus'

export const CREATE_COLLECTION_MUTATION = gql`
  mutation CreateCollectionMutation($title: String!) {
    createCollection(input: { title: $title }) {
      collection {
        title
        slug
        ...CollectionStubFragment
      }
    }
  }
  ${COLLECTION_STUB_FRAGMENT}
`

enum Mode {
  Resting,
  Creating,
  Error,
}

export type CreateCollectionProps = {
  onChange?(value: string): void
}

export const CreateCollection: React.FC<CreateCollectionProps> = ({
  onChange,
  ...rest
}) => {
  const [createCollection] = useMutation<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >(CREATE_COLLECTION_MUTATION)

  const history = useHistory()
  const hrefs = useHrefs()

  const { setContextualRef } = useContextualRef()

  const { sendNotification, sendError } = useAlerts()

  const [mode, setMode] = useState(Mode.Resting)
  const [value, setValue] = useState('')

  const handleChange = useCallback(
    (value: string) => {
      setValue(value)
      onChange && onChange(value)
    },
    [onChange]
  )

  const handleConfirm = useCallback(async () => {
    setMode(Mode.Creating)

    try {
      const { data } = await createCollection({ variables: { title: value } })
      const { collection } = data!.createCollection!
      sendNotification({ body: `successfully created ${collection.title}` })
      history.push(hrefs.collection(collection.slug))
    } catch (err) {
      setMode(Mode.Error)
      sendError({ body: errorMessage(err) })
    }
  }, [createCollection, history, hrefs, sendError, sendNotification, value])

  const { requestConfirmation, Confirmation } = useConfirm({
    onConfirm: handleConfirm,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    requestConfirmation()
  }

  return (
    <>
      <Form onSubmit={handleSubmit} {...rest}>
        <ClearableInput
          ref={setContextualRef('primaryInput')}
          name="title"
          placeholder="find or create collection"
          onChange={handleChange}
          disabled={mode === Mode.Creating}
          required
          autoFocus={AUTOFOCUS}
          autoComplete="off"
          title=""
          borderWidth={0}
          width={0}
          flex={1}
        />

        {value !== '' && (
          <Button
            borderWidth={0}
            borderLeft="1px solid"
            type="submit"
            disabled={mode === Mode.Creating}
          >
            {
              {
                [Mode.Resting]: 'add',
                [Mode.Creating]: 'adding',
                [Mode.Error]: 'error',
              }[mode]
            }
          </Button>
        )}
      </Form>

      <Confirmation zIndex={Z.MODAL}>{`create “${value}”`}</Confirmation>
    </>
  )
}
