import React, { useReducer, useCallback } from 'react'
import { graphql } from 'react-apollo'

import { updateCollectionMutation } from './mutations/updateCollection'

import { WithAlerts } from 'components/Alerts'
import { Box } from 'components/UI/Box'
import { KeyValueEditor } from 'components/UI/KeyValueEditor'
import { BorderedButton } from 'components/UI/Buttons'

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_METADATA':
      return {
        ...state,
        metadata: action.metadata,
      }
    default:
      return state
  }
}

export const CollectionSettings = graphql(updateCollectionMutation, {
  name: 'updateCollection',
})(
  WithAlerts(
    ({ collection, updateCollection, dispatchAlert, dispatchError }) => {
      const [state, dispatch] = useReducer(reducer, {
        title: collection.title,
        metadata: collection.metadata,
      })

      const handleSubmit = useCallback(async () => {
        try {
          await updateCollection({
            variables: {
              id: collection.id,
              title: state.title,
              metadata: JSON.stringify(state.metadata),
            },
          })
          dispatchAlert('Saved')
        } catch (err) {
          dispatchError(err)
        }
      }, [
        collection.id,
        dispatchAlert,
        dispatchError,
        state.metadata,
        state.title,
        updateCollection,
      ])

      const handleMetadata = useCallback(metadata => {
        dispatch({
          type: 'UPDATE_METADATA',
          metadata,
        })
      }, [])

      return (
        <Box display="flex" flexDirection="column" mt="-1px">
          <KeyValueEditor
            schema={Object.keys(collection.metadata).map(name => ({
              name,
              type: typeof collection.metadata[name],
            }))}
            data={collection.metadata}
            onChange={handleMetadata}
          />

          <BorderedButton mt={'-1px'} onClick={handleSubmit}>
            Update
          </BorderedButton>
        </Box>
      )
    }
  )
)
