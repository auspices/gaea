import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Caret, Pill, Stack, useAlerts } from '@auspices/eos'
import { useHrefs } from '../../hooks'
import { Loading } from '../../components/Loading'
import { DeleteCollection } from '../../components/DeleteCollection'
import { Fieldset, FieldsetData } from '../../components/Fieldset'
import { errorMessage } from '../../util/errors'
import { UpadateCollectionSettingsMutation } from '../../generated/types/UpadateCollectionSettingsMutation'
import {
  CollectionSettingsPageQuery,
  CollectionSettingsPageQueryVariables,
} from '../../generated/types/CollectionSettingsPageQuery'

export const UPDATE_COLLECTION_SETTINGS_MUTATION = gql`
  mutation UpadateCollectionSettingsMutation($id: ID!, $title: String) {
    updateCollection(input: { id: $id, title: $title }) {
      collection {
        id
        name
      }
    }
  }
`

export const COLLECTION_SETTINGS_PAGE_QUERY = gql`
  query CollectionSettingsPageQuery($id: ID!) {
    me {
      id
      slug
      username
      collection(id: $id) {
        id
        slug
        title
      }
    }
  }
`

enum Mode {
  Resting,
  Dirty,
  Saving,
}

type CollectionSettingsPageProps = {
  id: string
}

export const CollectionSettingsPage: React.FC<CollectionSettingsPageProps> = ({
  id,
}) => {
  const { data, loading, error, refetch } = useQuery<
    CollectionSettingsPageQuery,
    CollectionSettingsPageQueryVariables
  >(COLLECTION_SETTINGS_PAGE_QUERY, {
    variables: { id },
  })

  const [updateCollectionSettings] = useMutation<
    UpadateCollectionSettingsMutation
  >(UPDATE_COLLECTION_SETTINGS_MUTATION)

  const hrefs = useHrefs()

  const { sendError, sendNotification } = useAlerts()

  const [mode, setMode] = useState(Mode.Resting)
  const [state, setState] = useState<FieldsetData>()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (mode !== Mode.Dirty) return

      setMode(Mode.Saving)
      sendNotification({ body: 'saving' })

      try {
        await updateCollectionSettings({
          variables: { id, title: state?.title },
        })
        setMode(Mode.Resting)
        sendNotification({ body: 'updated' })
        refetch()
      } catch (err) {
        sendError({ body: errorMessage(err) })
        setMode(Mode.Dirty)
      }
    },
    [
      id,
      mode,
      refetch,
      sendError,
      sendNotification,
      state,
      updateCollectionSettings,
    ]
  )

  const handleChange = useCallback((data: FieldsetData) => {
    setMode(Mode.Dirty)
    setState(data)
  }, [])

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me,
    me: { collection },
  } = data

  return (
    <Stack flex="1">
      <Stack direction="horizontal">
        <Button as={Link} to={hrefs.collections()}>
          <Caret direction="left" mr={3} />
          {me.username}
        </Button>

        <Button as={Link} to={hrefs.collection(collection.slug)}>
          <Caret direction="left" mr={3} />
          {collection.title}
        </Button>

        <Pill flex="1">settings</Pill>
      </Stack>

      <Stack
        // @ts-ignore
        as="form"
        onSubmit={handleSubmit}
      >
        <Pill as="h2">attributes</Pill>

        <Fieldset data={{ title: collection.title }} onChange={handleChange} />

        <Button type="submit" disabled={mode !== Mode.Dirty}>
          {
            {
              [Mode.Resting]: 'save',
              [Mode.Dirty]: 'save',
              [Mode.Saving]: 'saving',
            }[mode]
          }
        </Button>
      </Stack>

      <Pill as="h2" color="danger" borderColor="danger" zIndex={1}>
        danger
      </Pill>

      <DeleteCollection id={id} confirmation={collection.title} />
    </Stack>
  )
}
