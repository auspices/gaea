import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { PaneOption, useAlerts } from '@auspices/eos'
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
  Deleting,
  Error,
}

type RemoveFromCollectionProps = {
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
    const { sendError } = useAlerts()

    const [removeFromCollection] = useMutation<
      RemoveFromCollectionMutation,
      RemoveFromCollectionMutationVariables
    >(REMOVE_FROM_COLLECTION_MUTATION)

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        setMode(Mode.Deleting)

        try {
          await removeFromCollection({
            variables: { contentId: `${contentId}` },
          })
        } catch (err) {
          setMode(Mode.Error)
          sendError({ body: errorMessage(err) })
        }

        refetch()
      },
      [contentId, refetch, removeFromCollection, sendError]
    )

    return (
      <PaneOption
        ref={forwardedRef}
        onClick={handleClick}
        disabled={mode !== Mode.Resting}
        {...rest}
      >
        {children}
      </PaneOption>
    )
  }
)
