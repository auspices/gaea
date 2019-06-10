import gql from 'graphql-tag'

import { contentSettingsFragment } from 'components/ContentSettings/fragments/contentSettings'

export const updateContentMutation = gql`
  mutation updateContent($id: ID!, $metadata: RawJson) {
    updateContent(input: { id: $id, metadata: $metadata, replace: true }) {
      content {
        ...ContentSettings
      }
    }
  }
  ${contentSettingsFragment}
`
