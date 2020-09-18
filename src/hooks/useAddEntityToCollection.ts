import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { useAlerts } from '@auspices/eos'
import { useRefetch } from './useRefetch'
import { errorMessage } from '../util/errors'
import { AddEntityToCollectionMutation } from '../generated/types/AddEntityToCollectionMutation'
import { EntityTypes } from '../generated/types/globalTypes'
import { useMatchesPath } from './useMatchesPath'

export const ADD_ENTITY_TO_COLLECTION_MUTATION = gql`
  mutation AddEntityToCollectionMutation(
    $parentId: ID!
    $childId: ID!
    $type: EntityTypes!
  ) {
    addEntityToCollection(
      input: { id: $parentId, entity: { id: $childId, type: $type } }
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

export const useCreateAndAddCollection = () => {
  const { matches } = useMatchesPath()
  const match = matches.collection
  const { id = '' } = match ? match.params : {}

  const { refetch } = useRefetch()
  const { sendError, sendNotification } = useAlerts()

  const [addEntityToCollectionMutation] = useMutation<
    AddEntityToCollectionMutation
  >(ADD_ENTITY_TO_COLLECTION_MUTATION)

  const handleAddEntityToCollection = useCallback(
    async (childId: number, childName: string, type: EntityTypes) => {
      try {
        await addEntityToCollectionMutation({
          variables: { parentId: id, childId, type },
        })
        sendNotification({ body: `successfully added ${childName}` })
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }

      await refetch()
    },
    [addEntityToCollectionMutation, id, refetch, sendError, sendNotification]
  )

  return {
    addEntityToCollection: handleAddEntityToCollection,
  }
}
