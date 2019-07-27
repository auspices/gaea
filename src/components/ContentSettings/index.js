import React, { useCallback } from 'react'
import { graphql } from 'react-apollo'

import { updateContentMutation } from './mutations/updateContent'

import { WithAlerts } from 'components/Alerts'
import { Box } from 'components/UI/Box'
import { KeyValueEditor } from 'components/UI/KeyValueEditor'

export const ContentSettings = graphql(updateContentMutation, {
  name: 'updateContent',
})(
  WithAlerts(
    ({ content, updateContent, dispatchAlert, dispatchError, ...rest }) => {
      const handleSubmit = useCallback(
        async metadata => {
          try {
            await updateContent({
              variables: {
                id: content.id,
                metadata: JSON.stringify(metadata),
              },
            })
            dispatchAlert('Saved')
          } catch (err) {
            dispatchError(err)
          }
        },
        [content.id, dispatchAlert, dispatchError, updateContent]
      )

      return (
        <Box display="flex" flexDirection="column" {...rest}>
          <KeyValueEditor
            schema={Object.keys(content.metadata).map(name => ({
              name,
              type: typeof content.metadata[name],
            }))}
            data={content.metadata}
            onSave={handleSubmit}
          />
        </Box>
      )
    }
  )
)
