import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { PaneOption, PaneOptionProps, useAlerts } from '@auspices/eos'
import { errorMessage } from '../../util/errors'
import { useRefetch } from '../../hooks'
import {
  RemoveFromCollectionMutation,
  RemoveFromCollectionMutationVariables,
} from '../../generated/types/RemoveFromCollectionMutation'

export const REMOVE_FROM_COLLECTION_MUTATION = gql`
  mutation RemoveFromCollectionMutation($contentId: ID!) {
    removeFromCollection(input: { contentId: $contentId }) {
      collection {
        id
      }
    }
  }
`

enum Mode {
  Resting,
  Confirm,
  Deleting,
  Error,
}

type RemoveFromCollectionProps = PaneOptionProps & {
  children: React.ReactNode
  contentId: number
  collectionId: number
}

export const RemoveFromCollection = React.forwardRef(
  (
    { children, contentId, collectionId, ...rest }: RemoveFromCollectionProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const [mode, setMode] = useState(Mode.Resting)

    const { refetch } = useRefetch()
    const { sendError, sendNotification } = useAlerts()

    const [removeFromCollection] = useMutation<
      RemoveFromCollectionMutation,
      RemoveFromCollectionMutationVariables
    >(REMOVE_FROM_COLLECTION_MUTATION)

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        if (mode === Mode.Resting) {
          setMode(Mode.Confirm)
          return
        }

        setMode(Mode.Deleting)

        try {
          await removeFromCollection({
            variables: { contentId: `${contentId}` },
          })
          sendNotification({ body: 'successfully removed' })
        } catch (err) {
          setMode(Mode.Error)
          sendError({ body: errorMessage(err) })
        }

        refetch()
      },
      [
        contentId,
        mode,
        refetch,
        removeFromCollection,
        sendError,
        sendNotification,
      ]
    )

    return (
      <PaneOption
        ref={forwardedRef}
        onClick={handleClick}
        disabled={mode === Mode.Deleting}
        {...rest}
      >
        {
          {
            [Mode.Resting]: children,
            [Mode.Confirm]: 'confirm',
            [Mode.Deleting]: 'deleting',
            [Mode.Error]: 'error',
          }[mode]
        }
      </PaneOption>
    )
  }
)
