import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { useAlerts } from '@auspices/eos'
import { useRefetch } from './useRefetch'
import { errorMessage } from '../util/errors'
import { AddEntityToCollectionMutation } from '../generated/types/AddEntityToCollectionMutation'
import { AddEntityFromContentToCollectionMutation } from '../generated/types/AddEntityFromContentToCollectionMutation'
import { EntityTypes } from '../generated/types/globalTypes'

export const ADD_ENTITY_TO_COLLECTION_MUTATION = gql`
  mutation AddEntityToCollectionMutation(
    $id: ID!
    $entityId: ID!
    $entityType: EntityTypes!
  ) {
    addEntityToCollection(
      input: { id: $id, entity: { id: $entityId, type: $entityType } }
    ) {
      collection {
        id
      }
      content {
        id
      }
    }
  }
`

export const ADD_ENTITY_FROM_CONTENT_TO_COLLECTION_MUTATION = gql`
  mutation AddEntityFromContentToCollectionMutation($id: ID!, $contentId: ID!) {
    addEntityFromContentToCollection(
      input: { id: $id, contentId: $contentId }
    ) {
      collection {
        id
      }
      content {
        id
      }
    }
  }
`

export const useAddEntityToCollection = () => {
  const { refetch } = useRefetch()
  const { sendError, sendNotification } = useAlerts()

  const [addEntityToCollectionMutation] = useMutation<
    AddEntityToCollectionMutation
  >(ADD_ENTITY_TO_COLLECTION_MUTATION)

  const handleAddEntityToCollection = useCallback(
    async (
      id: number | string,
      entityId: number | string,
      entityType: EntityTypes
    ) => {
      try {
        await addEntityToCollectionMutation({
          variables: { id, entityId, entityType },
        })
        sendNotification({ body: 'successfully added' })
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }

      await refetch()
    },
    [addEntityToCollectionMutation, refetch, sendError, sendNotification]
  )

  const [addEntityFromContentToCollectionMutation] = useMutation<
    AddEntityFromContentToCollectionMutation
  >(ADD_ENTITY_FROM_CONTENT_TO_COLLECTION_MUTATION)

  const handleAddEntityFromContentToCollection = useCallback(
    async (id: number | string, contentId: number | string) => {
      try {
        await addEntityFromContentToCollectionMutation({
          variables: { id, contentId },
        })
        sendNotification({ body: 'successfully added' })
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }

      await refetch()
    },
    [
      addEntityFromContentToCollectionMutation,
      refetch,
      sendError,
      sendNotification,
    ]
  )

  return {
    addEntityToCollection: handleAddEntityToCollection,
    addEntityFromContentToCollection: handleAddEntityFromContentToCollection,
  }
}
