import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Button, ClearableInput, useAlerts } from '@auspices/eos'
import { useHrefs } from '../../hooks'
import { errorMessage } from '../../util/errors'
import { Form } from '../Form'
import { COLLECTION_STUB_FRAGMENT } from '../../components/CollectionStub'
import {
  CreateCollectionMutation,
  CreateCollectionMutationVariables,
} from '../../generated/types/CreateCollectionMutation'

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

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
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
    },
    [createCollection, history, hrefs, sendError, sendNotification, value]
  )

  return (
    <Form onSubmit={handleSubmit} {...rest}>
      <ClearableInput
        name="title"
        placeholder="find or create collection"
        onChange={handleChange}
        disabled={mode === Mode.Creating}
        required
        autoFocus
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
          {(mode === Mode.Resting || mode === Mode.Creating) && 'add'}
          {mode === Mode.Error && 'error'}
        </Button>
      )}
    </Form>
  )
}
