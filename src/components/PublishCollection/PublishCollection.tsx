import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { PaneOption, PaneOptionProps, useAlerts } from '@auspices/eos'
import { useRefetch } from '../../hooks'
import { errorMessage } from '../../util/errors'
import {
  PublishCollectionMutation,
  PublishCollectionMutationVariables,
} from '../../generated/types/PublishCollectionMutation'

export const PUBLISH_COLLECTION_MUTATION = gql`
  mutation PublishCollectionMutation($id: ID!, $regenerate: Boolean) {
    publishCollection(input: { id: $id, regenerate: $regenerate }) {
      collection {
        id
        key
      }
    }
  }
`

enum Mode {
  Resting,
  Confirm,
  Saving,
  Error,
}

type PublishCollectionProps = Omit<PaneOptionProps, 'id'> & {
  id: number
  regenerate?: boolean
}

export const PublishCollection = React.forwardRef(
  (
    { id, regenerate = false, ...rest }: PublishCollectionProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const { refetch } = useRefetch()
    const { sendNotification, sendError } = useAlerts()
    const [mode, setMode] = useState(Mode.Resting)

    const [publish] = useMutation<
      PublishCollectionMutation,
      PublishCollectionMutationVariables
    >(PUBLISH_COLLECTION_MUTATION)

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        if (regenerate && mode === Mode.Resting) {
          setMode(Mode.Confirm)
          return
        }

        setMode(Mode.Saving)

        try {
          await publish({ variables: { id: `${id}`, regenerate } })
        } catch (err) {
          setMode(Mode.Error)
          sendError({ body: errorMessage(err) })
        }

        if (regenerate) {
          setMode(Mode.Resting)
          sendNotification({ body: 'regenerated data endpoint' })
        }

        if (!regenerate) {
          sendNotification({ body: 'published data' })
        }

        refetch()
      },
      [regenerate, mode, refetch, publish, id, sendError, sendNotification]
    )

    return (
      <PaneOption
        ref={forwardedRef}
        onClick={handleClick}
        disabled={mode === Mode.Saving}
        {...rest}
      >
        {
          {
            [Mode.Resting]: `${regenerate ? 're-' : ''}publish`,
            [Mode.Confirm]: 'confirm',
            [Mode.Saving]: 'updating',
            [Mode.Error]: 'error',
          }[mode]
        }
      </PaneOption>
    )
  }
)
