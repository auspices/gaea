import React, { useReducer } from 'react'
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
import { useMutation, useQuery } from '@apollo/client'
import { CapturePageCollectionsQuery } from '../../generated/types/CapturePageCollectionsQuery'
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

type State = {
  mode: Mode
  value: string
  ids: number[]
}

const INITIAL_STATE = {
  mode: Mode.Input,
  value: '',
  ids: [],
}

type Action =
  | { type: 'RESET' }
  | { type: 'UPDATE'; payload: Partial<State> }
  | { type: 'TOGGLE'; payload: number }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'RESET':
      return INITIAL_STATE
    case 'UPDATE':
      return {
        ...state,
        ...action.payload,
      }
    case 'TOGGLE':
      const ids = state.ids.includes(action.payload)
        ? state.ids.filter((id) => id !== action.payload)
        : [...new Set([...state.ids, action.payload])]

      return {
        ...state,
        ids,
      }
  }
}

export const CapturePage: React.FC = () => {
  const [{ mode, value, ids }, dispatch] = useReducer(reducer, INITIAL_STATE)

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
    dispatch({ type: 'UPDATE', payload: { mode: Mode.Saving } })

    try {
      await addToCollectionsMutation({
        variables: {
          ids: ids.map((id) => String(id)),
          value,
        },
      })

      sendNotification({ body: 'successfully added' })
      dispatch({ type: 'RESET' })
    } catch (err) {
      sendError({ body: errorMessage(err) })
      dispatch({ type: 'UPDATE', payload: { mode: Mode.Add } })
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
                    dispatch({
                      type: 'UPDATE',
                      payload: { value: event.currentTarget.value },
                    })
                  }}
                  autoFocus
                  required
                />

                <Button
                  disabled={value === ''}
                  onClick={() => {
                    dispatch({ type: 'UPDATE', payload: { mode: Mode.Add } })
                  }}
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
                            dispatch({ type: 'TOGGLE', payload: collection.id })
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