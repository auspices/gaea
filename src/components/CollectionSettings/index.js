import React, { useCallback } from 'react'
import { graphql } from 'react-apollo'

import { updateCollectionMutation } from './mutations/updateCollection'

import { Box } from 'components/UI/Box'
import { WithAlerts } from 'components/Alerts'
import { KeyValueEditor } from 'components/UI/KeyValueEditor'

export const CollectionSettings = graphql(updateCollectionMutation, {
  name: 'updateCollection',
})(
  WithAlerts(
    ({
      collection,
      updateCollection,
      dispatchAlert,
      dispatchError,
      ...rest
    }) => {
      const handleSubmit = useCallback(
        async metadata => {
          try {
            await updateCollection({
              variables: {
                id: collection.id,
                metadata: JSON.stringify(metadata),
              },
            })
            dispatchAlert('Saved')
          } catch (err) {
            dispatchError(err)
          }
        },
        [collection.id, dispatchAlert, dispatchError, updateCollection]
      )

      return (
        <Box display="flex" flexDirection="column" {...rest}>
          <KeyValueEditor
            schema={Object.keys(collection.metadata).map(name => ({
              name,
              type: typeof collection.metadata[name],
            }))}
            data={collection.metadata}
            onSave={handleSubmit}
          />
        </Box>
      )
    }
  )
)
