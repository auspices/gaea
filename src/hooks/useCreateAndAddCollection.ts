import { useCallback } from 'react'
import { gql } from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { useAlerts } from '@auspices/eos'
import { useRefetch } from './useRefetch'
import { errorMessage } from '../util/errors'
import { AddCollectionToCollectionMutation } from '../generated/types/AddCollectionToCollectionMutation'
import { CreateCollectionToAddMutation } from '../generated/types/CreateCollectionToAddMutation'
import { useMatchesPath } from './useMatchesPath'

export const CREATE_COLLECTION_TO_ADD_MUTATION = gql`
  mutation CreateCollectionToAddMutation($title: String!) {
    createCollection(input: { title: $title }) {
      collection {
        id
        name
      }
    }
  }
`

export const ADD_COLLECTION_TO_COLLECTION_MUTATION = gql`
  mutation AddCollectionToCollectionMutation($parentId: ID!, $childId: ID!) {
    addEntityToCollection(
      input: { id: $parentId, entity: { id: $childId, type: COLLECTION } }
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

  const [createCollectionToAddMutation] =
    useMutation<CreateCollectionToAddMutation>(
      CREATE_COLLECTION_TO_ADD_MUTATION
    )

  const [addCollectionToCollectionMutation] =
    useMutation<AddCollectionToCollectionMutation>(
      ADD_COLLECTION_TO_COLLECTION_MUTATION
    )

  const handleCreateCollectionToAdd = useCallback(
    async (title: string) => {
      const { data } = await createCollectionToAddMutation({
        variables: { title },
      })
      if (!data || !data.createCollection)
        throw new Error(`unable to create ${title}`)
      return data.createCollection.collection
    },
    [createCollectionToAddMutation]
  )

  const handleAddCollectionToCollection = useCallback(
    async (childId: number, childName: string) => {
      try {
        await addCollectionToCollectionMutation({
          variables: { parentId: id, childId },
        })
        sendNotification({ body: `successfully added ${childName}` })
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }

      await refetch()
    },
    [
      addCollectionToCollectionMutation,
      id,
      refetch,
      sendError,
      sendNotification,
    ]
  )

  const handleCreateAndAddCollectionToCollection = useCallback(
    async (title: string) => {
      try {
        sendNotification({ body: `creating ${title}` })
        const { id, name } = await handleCreateCollectionToAdd(title)
        sendNotification({ body: `successfully created ${title}` })
        handleAddCollectionToCollection(id, name)
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }
    },
    [
      handleAddCollectionToCollection,
      handleCreateCollectionToAdd,
      sendError,
      sendNotification,
    ]
  )

  return {
    createCollection: handleCreateCollectionToAdd,
    addCollectionToCollection: handleAddCollectionToCollection,
    createAndAddCollectionToCollection:
      handleCreateAndAddCollectionToCollection,
  }
}
