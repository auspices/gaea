import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useDebouncedCallback } from 'use-debounce'
import gql from 'graphql-tag'
import { KeyValueEditor, toSchema, useAlerts } from '@auspices/eos'
import { errorMessage } from '../../util/errors'
import {
  ContentSettingsMutation,
  ContentSettingsMutationVariables,
} from '../../generated/types/ContentSettingsMutation'
import { ContentSettingsFragment } from '../../generated/types/ContentSettingsFragment'

export const CONTENT_SETTINGS_FRAGMENT = gql`
  fragment ContentSettingsFragment on Content {
    id
    metadata
  }
`

export const CONTENT_SETTINGS_MUTATION = gql`
  mutation ContentSettingsMutation($id: ID!, $metadata: JSON) {
    updateContent(input: { id: $id, metadata: $metadata, replace: true }) {
      content {
        ...ContentSettingsFragment
      }
    }
  }
  ${CONTENT_SETTINGS_FRAGMENT}
`

export type ContentSettingsProps = {
  content: ContentSettingsFragment
}

export const ContentSettings: React.FC<ContentSettingsProps> = ({
  content,
}) => {
  const { sendNotification, sendError } = useAlerts()
  const [updateContent] = useMutation<
    ContentSettingsMutation,
    ContentSettingsMutationVariables
  >(CONTENT_SETTINGS_MUTATION)

  const handleChange = useCallback(
    async (data: Record<string, string>) => {
      try {
        await updateContent({
          variables: {
            id: `${content.id}`,
            metadata: JSON.stringify(data),
          },
        })
        sendNotification({ body: 'saved' })
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }
    },
    [content.id, sendError, sendNotification, updateContent]
  )

  const [debouncedHandleChange] = useDebouncedCallback(handleChange, 500)

  return (
    <KeyValueEditor
      schema={toSchema(content.metadata)}
      data={content.metadata}
      onChange={debouncedHandleChange}
    />
  )
}
