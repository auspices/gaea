import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {
  Box,
  Button,
  Caret,
  Input,
  Loading,
  ProgressBar,
  Stack,
  useAlerts,
} from '@auspices/eos'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { CapturePageCollectionsQuery } from '../../generated/types/CapturePageCollectionsQuery'
import { HREFS } from '../../hooks'
import { errorMessage } from '../../util/errors'
import {
  AddToCollectionsMutation,
  AddToCollectionsMutationVariables,
} from '../../generated/types/AddToCollectionsMutation'

export const ADD_TO_COLLECTIONS_MUTATION = gql`
  mutation AddToCollectionsMutation(
    $ids: [ID!]!
    $value: String!
    $metadata: JSON
  ) {
    addToCollections(input: { ids: $ids, value: $value, metadata: $metadata }) {
      collections {
        id
      }
      contents {
        id
      }
    }
  }
`

const CAPTURE_PAGE_COLLECTIONS_QUERY = gql`
  query CapturePageCollectionsQuery {
    me {
      collections(per: 5) {
        id
        name
        href
      }
    }
  }
`

enum Mode {
  Input,
  Add,
  Saving,
}

const PROGRESS = {
  [Mode.Input]: 0,
  [Mode.Add]: 50,
  [Mode.Saving]: 99,
}

export const CapturePage: React.FC = () => {
  const [mode, setMode] = useState(Mode.Input)
  const [value, setValue] = useState('')
  const [ids, setIds] = useState<number[]>([])

  const history = useHistory()

  const { sendError, sendNotification } = useAlerts()

  const [addToCollectionsMutation] = useMutation<
    AddToCollectionsMutation,
    AddToCollectionsMutationVariables
  >(ADD_TO_COLLECTIONS_MUTATION)

  const { loading, data, error } = useQuery<CapturePageCollectionsQuery>(
    CAPTURE_PAGE_COLLECTIONS_QUERY
  )

  if (error) {
    throw error
  }

  const handleSave = async () => {
    setMode(Mode.Saving)

    try {
      await addToCollectionsMutation({
        variables: {
          ids: ids.map((id) => String(id)),
          value,
        },
      })

      sendNotification({ body: 'successfully added' })

      history.push(HREFS.root())
    } catch (err) {
      sendError({ body: errorMessage(err) })
      setMode(Mode.Add)
    }
  }

  return (
    <>
      <Helmet>
        <title>capture</title>
      </Helmet>

      <ProgressBar
        position="fixed"
        top={0}
        right={0}
        left={0}
        zIndex={1}
        progress={PROGRESS[mode]}
      />

      {(() => {
        switch (mode) {
          case Mode.Input:
            return (
              <Stack>
                <Input
                  as="textarea"
                  placeholder="begin typing"
                  defaultValue={value}
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLTextAreaElement | HTMLInputElement
                    >
                  ) => {
                    setValue(event.currentTarget.value)
                  }}
                  autoFocus
                  required
                />

                <Button
                  disabled={value === ''}
                  onClick={() => setMode(Mode.Add)}
                >
                  next <Caret ml={3} direction="right" />
                </Button>
              </Stack>
            )

          case Mode.Add:
            return (
              <Stack>
                {!loading && !error && (
                  <Stack>
                    {data?.me.collections.map((collection) => {
                      return (
                        <Button
                          selected={ids.includes(collection.id)}
                          onClick={() => {
                            if (ids.includes(collection.id)) {
                              setIds((prevCollectionIDs) =>
                                prevCollectionIDs.filter(
                                  (id) => id !== collection.id
                                )
                              )
                              return
                            }

                            setIds((prevCollectionIDs) => [
                              ...new Set([...prevCollectionIDs, collection.id]),
                            ])
                          }}
                        >
                          add to {collection.name}
                        </Button>
                      )
                    })}
                  </Stack>
                )}

                {ids.length > 0 && (
                  <Button onClick={handleSave}>
                    add to ({ids.length})
                    <Caret ml={3} direction="right" />
                  </Button>
                )}
              </Stack>
            )

          case Mode.Saving:
            return (
              <Stack>
                <Loading>
                  <Box flex="1" textAlign="center">
                    saving
                  </Box>
                </Loading>
              </Stack>
            )
        }
      })()}
    </>
  )
}
