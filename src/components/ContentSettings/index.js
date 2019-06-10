import React, { useReducer, useCallback } from 'react'
import { graphql } from 'react-apollo'

import { updateContentMutation } from './mutations/updateContent'

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

export const ContentSettings = graphql(updateContentMutation, {
  name: 'updateContent',
})(
  WithAlerts(
    ({ content, updateContent, dispatchAlert, dispatchError, ...rest }) => {
      const [state, dispatch] = useReducer(reducer, {
        metadata: content.metadata,
      })

      const handleSubmit = useCallback(async () => {
        try {
          await updateContent({
            variables: {
              id: content.id,
              metadata: JSON.stringify(state.metadata),
            },
          })
          dispatchAlert('Saved')
        } catch (err) {
          dispatchError(err)
        }
      }, [
        content.id,
        dispatchAlert,
        dispatchError,
        state.metadata,
        updateContent,
      ])

      const handleMetadata = useCallback(metadata => {
        dispatch({
          type: 'UPDATE_METADATA',
          metadata,
        })
      }, [])

      return (
        <Box display="flex" flexDirection="column" {...rest}>
          <KeyValueEditor
            schema={Object.keys(content.metadata).map(name => ({
              name,
              type: typeof content.metadata[name],
            }))}
            data={content.metadata}
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
