import React, { useCallback, useState } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, PaneOption, PaneOptionProps, useAlerts } from '@auspices/eos'
import { useRefetch } from '../hooks'
import { errorMessage } from '../util/errors'
import {
  PublishCollectionMutation,
  PublishCollectionMutationVariables,
} from '../generated/graphql'

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

export const PublishCollectionPaneOption = React.forwardRef(
  (
    { id, regenerate = false, ...rest }: PublishCollectionProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const { handleClick, disabled, label } = usePublishCollection({
      id,
      regenerate,
    })

    return (
      <PaneOption
        ref={forwardedRef}
        onClick={handleClick}
        disabled={disabled}
        {...rest}
      >
        {label}
      </PaneOption>
    )
  }
)
export const PublishCollectionButton = React.forwardRef(
  (
    { id, regenerate = false, ...rest }: PublishCollectionProps,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const { handleClick, disabled, label } = usePublishCollection({
      id,
      regenerate,
    })

    return (
      <Button
        ref={forwardedRef}
        onClick={handleClick}
        disabled={disabled}
        {...rest}
      >
        {label}
      </Button>
    )
  }
)

export const usePublishCollection = ({
  id,
  regenerate,
}: {
  id: number
  regenerate: boolean
}) => {
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

  const label = {
    [Mode.Resting]: `${regenerate ? 're-' : ''}publish`,
    [Mode.Confirm]: 'confirm',
    [Mode.Saving]: 'updating',
    [Mode.Error]: 'error',
  }[mode]

  const disabled = mode === Mode.Saving

  return {
    disabled,
    mode,
    handleClick,
    label,
  }
}
