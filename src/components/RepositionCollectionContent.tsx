import React, { useCallback, useState } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { PaneOption, PaneOptionProps, useAlerts } from '@auspices/eos'
import { useRefetch } from '../hooks'
import { errorMessage } from '../util/errors'
import {
  ReorderAction,
  RepositionCollectionContentMutation,
  RepositionCollectionContentMutationVariables,
} from '../generated/graphql'

export { ReorderAction }

export const REPOSITION_COLLECTION_CONTENT_MUTATION = gql`
  mutation RepositionCollectionContentMutation(
    $contentId: ID!
    $action: ReorderAction!
  ) {
    repositionCollectionContent(
      input: { contentId: $contentId, action: $action }
    ) {
      collection {
        id
      }
    }
  }
`

enum Mode {
  Resting,
  Moving,
  Error,
}

type RepositionCollectionContentProps = PaneOptionProps & {
  action: ReorderAction
  contentId: number
}

export const RepositionCollectionContent = React.forwardRef(
  (
    { action, contentId, ...rest }: RepositionCollectionContentProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const { refetch } = useRefetch()
    const { sendError } = useAlerts()
    const [mode, setMode] = useState(Mode.Resting)

    const [reposition] = useMutation<
      RepositionCollectionContentMutation,
      RepositionCollectionContentMutationVariables
    >(REPOSITION_COLLECTION_CONTENT_MUTATION)

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        setMode(Mode.Moving)

        try {
          await reposition({
            variables: { contentId: `${contentId}`, action },
          })
        } catch (err) {
          setMode(Mode.Error)
          sendError({ body: errorMessage(err) })
        }

        refetch()
      },
      [action, contentId, refetch, reposition, sendError]
    )

    return (
      <PaneOption
        ref={forwardedRef}
        onClick={handleClick}
        disabled={mode !== Mode.Resting}
        {...rest}
      >
        {
          {
            [ReorderAction.MoveToTop]: 'move to start',
            [ReorderAction.MoveToBottom]: 'move to end',
            [ReorderAction.MoveUp]: 'move left',
            [ReorderAction.MoveDown]: 'move right',
            [ReorderAction.InsertAt]: 'move to',
          }[action]
        }
      </PaneOption>
    )
  }
)
