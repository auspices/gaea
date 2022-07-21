import React, { useCallback, useState } from 'react'
import { gql } from 'graphql-tag'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Caret,
  Cell,
  Loading,
  Stack,
  Tooltip,
  useAlerts,
} from '@auspices/eos'
import { Helmet } from 'react-helmet'
import { useHrefs } from '../hooks'
import { DeleteCollection } from '../components/DeleteCollection'
import { Fieldset, FieldsetData } from '../components/Fieldset'
import { errorMessage } from '../util/errors'
import {
  CollectionSettingsPageQuery,
  CollectionSettingsPageQueryVariables,
  UpadateCollectionSettingsMutation,
} from '../generated/graphql'
import { BottomNav } from '../components/BottomNav'
import { UnpublishCollectionButton } from '../components/UnpublishCollection'
import { PublishCollectionButton } from '../components/PublishCollection'

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
        key
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

export const CollectionSettingsPage: React.FC = () => {
  const { id = '' } = useParams()
  const { data, loading, error, refetch } = useQuery<
    CollectionSettingsPageQuery,
    CollectionSettingsPageQueryVariables
  >(COLLECTION_SETTINGS_PAGE_QUERY, {
    variables: { id },
  })

  const [updateCollectionSettings] =
    useMutation<UpadateCollectionSettingsMutation>(
      UPDATE_COLLECTION_SETTINGS_MUTATION
    )

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
    <>
      <Helmet>
        <title>{['settings', collection.title].join(' / ')}</title>
      </Helmet>

      <Stack flex="1">
        <Stack direction={['vertical', 'vertical', 'horizontal']}>
          <Stack direction="horizontal">
            <Button as={Link} to={hrefs.collections()}>
              <Caret direction="left" mr={3} />
              {me.username}
            </Button>

            <Button as={Link} to={hrefs.collection(collection.slug)} flex="1">
              <Caret direction="left" mr={3} />
              {collection.title}
            </Button>
          </Stack>

          <Cell as="h1" flex="1">
            settings
          </Cell>
        </Stack>

        <Stack
          // @ts-ignore
          as="form"
          onSubmit={handleSubmit}
        >
          <Fieldset
            data={{ title: collection.title }}
            onChange={handleChange}
          />

          <Button width="100%" type="submit" disabled={mode !== Mode.Dirty}>
            {
              {
                [Mode.Resting]: 'save',
                [Mode.Dirty]: 'save',
                [Mode.Saving]: 'saving',
              }[mode]
            }
          </Button>
        </Stack>

        <Stack mt={8}>
          {collection.key ? (
            <Stack>
              <Button
                key="data"
                as="a"
                href={hrefs.data(collection.key)}
                target="_blank"
              >
                data
                <Caret direction="right" ml={3} />
              </Button>

              <Stack>
                <Tooltip
                  label="unpublishing will disable the graphql endpoint; re-enabling it will change the key"
                  placement="bottom"
                >
                  <UnpublishCollectionButton id={collection.id} />
                </Tooltip>
              </Stack>

              <Stack>
                <Tooltip
                  label="re-publshing will regenerate and change the key; breaking any existing integrations"
                  placement="bottom"
                >
                  <PublishCollectionButton id={collection.id} regenerate />
                </Tooltip>
              </Stack>
            </Stack>
          ) : (
            <Tooltip
              label="publishing will expose a publicly available graphql endpoint"
              placement="bottom"
            >
              <PublishCollectionButton id={collection.id} />
            </Tooltip>
          )}
        </Stack>
      </Stack>

      <BottomNav>
        <DeleteCollection
          width="100%"
          id={id}
          confirmation={collection.title}
        />
      </BottomNav>
    </>
  )
}
