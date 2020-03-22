import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useDebouncedCallback } from 'use-debounce'
import gql from 'graphql-tag'
import { KeyValueEditor, StackProps, toSchema, useAlerts } from '@auspices/eos'
import { errorMessage } from '../../util/errors'
import {
  CollectionSettingsMutation,
  CollectionSettingsMutationVariables,
} from '../../generated/types/CollectionSettingsMutation'
import { CollectionSettingsFragment } from '../../generated/types/CollectionSettingsFragment'

export const COLLECTION_SETTINGS_FRAGMENT = gql`
  fragment CollectionSettingsFragment on Collection {
    id
    title
    metadata
  }
`

export const COLLECTION_SETTINGS_MUTATION = gql`
  mutation CollectionSettingsMutation(
    $id: ID!
    $title: String
    $metadata: JSON
  ) {
    updateCollection(
      input: { id: $id, title: $title, metadata: $metadata, replace: true }
    ) {
      collection {
        ...CollectionSettingsFragment
      }
    }
  }
  ${COLLECTION_SETTINGS_FRAGMENT}
`

export type CollectionSettingsProps = StackProps & {
  collection: CollectionSettingsFragment
}

export const CollectionSettings: React.FC<CollectionSettingsProps> = ({
  collection,
  ...rest
}) => {
  const { sendNotification, sendError } = useAlerts()
  const [updateCollection] = useMutation<
    CollectionSettingsMutation,
    CollectionSettingsMutationVariables
  >(COLLECTION_SETTINGS_MUTATION)

  const handleChange = useCallback(
    async (data: Record<string, string>) => {
      try {
        await updateCollection({
          variables: {
            id: `${collection.id}`,
            metadata: JSON.stringify(data),
          },
        })
        sendNotification({ body: 'saved' })
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }
    },
    [collection.id, sendError, sendNotification, updateCollection]
  )

  const [debouncedHandleChange] = useDebouncedCallback(handleChange, 500)

  return (
    <KeyValueEditor
      schema={toSchema(collection.metadata)}
      data={collection.metadata}
      onChange={debouncedHandleChange}
      {...rest}
    />
  )
}
