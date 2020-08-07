import React, { useCallback, useMemo } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, Stack, StackProps, useAlerts } from '@auspices/eos'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
import { useContextualRef, useRefetch } from '../../hooks'
import { errorMessage } from '../../util/errors'
import { AddCollectionToCollectionMutation } from '../../generated/types/AddCollectionToCollectionMutation'
import { CreateCollectionToAddMutation } from '../../generated/types/CreateCollectionToAddMutation'
import { useParams } from 'react-router'

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

export type AddToCollectionExtendedOption = {
  label: string
  onClick(): void
}

export type AddToCollectionExtendedOptionsProps = StackProps & {
  value: string
  collections: { id: number; name: string }[]
  onDone(): void
}

export const AddToCollectionExtendedOptions: React.FC<AddToCollectionExtendedOptionsProps> = ({
  value,
  collections,
  onDone,
  ...rest
}) => {
  const { id = '' } = useParams()
  const { refetch } = useRefetch()
  const { sendError, sendNotification } = useAlerts()

  const { getContextualRef } = useContextualRef()
  const inputRef = getContextualRef('collectionInput')

  const [createCollectionToAddMutation] = useMutation<
    CreateCollectionToAddMutation
  >(CREATE_COLLECTION_TO_ADD_MUTATION)

  const [addCollectionToCollectionMutation] = useMutation<
    AddCollectionToCollectionMutation
  >(ADD_COLLECTION_TO_COLLECTION_MUTATION)

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

      refetch()
      onDone()
    },
    [
      addCollectionToCollectionMutation,
      id,
      onDone,
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

  const list: AddToCollectionExtendedOption[] = useMemo(
    () => [
      ...collections.map(({ id: childId, name: childName }) => ({
        label: `add ${childName}`,
        onClick: () => handleAddCollectionToCollection(childId, childName),
      })),
      {
        label: `create and add collection “${value}”`,
        onClick: () => handleCreateAndAddCollectionToCollection(value),
      },
    ],
    [
      collections,
      handleAddCollectionToCollection,
      handleCreateAndAddCollectionToCollection,
      value,
    ]
  )

  const handleEnter = useCallback(
    ({
      event,
      element: option,
    }: {
      event: KeyboardEvent
      element: AddToCollectionExtendedOption
    }) => {
      event.preventDefault()
      option.onClick()
    },
    []
  )

  const { index } = useKeyboardListNavigation({
    ref: inputRef,
    list,
    waitForInteractive: true,
    onEnter: handleEnter,
  })

  return (
    <Stack {...rest}>
      {list.map((option, i) => (
        <Button key={i} focus={index === i} onClick={option.onClick}>
          {option.label}
        </Button>
      ))}
    </Stack>
  )
}
