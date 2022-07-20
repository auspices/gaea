import React, { useCallback, useState } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { PaneOption, PaneOptionProps, useAlerts } from '@auspices/eos'
import { useRefetch } from '../hooks'
import { errorMessage } from '../util/errors'
import {
  UnpublishCollectionMutation,
  UnpublishCollectionMutationVariables,
} from '../generated/graphql'

export const UNPUBLISH_COLLECTION_MUTATION = gql`
  mutation UnpublishCollectionMutation($id: ID!) {
    unpublishCollection(input: { id: $id }) {
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

type UnpublishCollectionProps = Omit<PaneOptionProps, 'id'> & {
  id: number
}

export const UnpublishCollection = React.forwardRef(
  (
    { id, ...rest }: UnpublishCollectionProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const { refetch } = useRefetch()
    const { sendNotification, sendError } = useAlerts()
    const [mode, setMode] = useState(Mode.Resting)

    const [unpublish] = useMutation<
      UnpublishCollectionMutation,
      UnpublishCollectionMutationVariables
    >(UNPUBLISH_COLLECTION_MUTATION)

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        if (mode === Mode.Resting) {
          setMode(Mode.Confirm)
          return
        }

        setMode(Mode.Saving)

        try {
          await unpublish({ variables: { id: `${id}` } })
        } catch (err) {
          setMode(Mode.Error)
          sendError({ body: errorMessage(err) })
        }

        sendNotification({ body: 'unpublished data' })

        refetch()
      },
      [id, mode, refetch, sendError, sendNotification, unpublish]
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
            [Mode.Resting]: 'unpublish',
            [Mode.Confirm]: 'confirm',
            [Mode.Saving]: 'updating',
            [Mode.Error]: 'error',
          }[mode]
        }
      </PaneOption>
    )
  }
)
