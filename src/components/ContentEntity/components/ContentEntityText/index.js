import React, { useCallback, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import useDebounce from 'react-use/lib/useDebounce'

import { WithAlerts } from '../../../../components/Alerts'
import { Box } from '../../../../components/UI/Box'

import { updateEntityMutation } from '../../mutations/updateEntity'

const Container = styled(Box).attrs({
  p: 6,
})`
  position: relative;
  display: flex;
  flex: 1;
  width: 80ch;
  max-width: 100%;
  border: 1px solid black;

  > textarea {
    flex: 1;
    width: 100%;
    padding: 0;
    font-size: 1rem;
    border: 0;
    resize: none;
    line-height: ${props => props.theme.lineHeights[2]};

    &:focus {
      outline: 0;
    }
  }
`

const Status = styled(Box).attrs({ m: 6 })`
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  border-radius: 50%;
  width: 0.5em;
  height: 0.5em;
`

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        edited: true,
        value: action.value,
      }
    case 'BEGIN_SAVE':
      return {
        ...state,
      }
    case 'COMPLETE_SAVE':
      return {
        ...state,
        edited: false,
      }
    default:
      throw new Error('Invalid `action.type`', action)
  }
}

export const ContentEntityText = graphql(updateEntityMutation, {
  name: 'updateEntity',
})(
  WithAlerts(
    ({ text, updateEntity, dispatchError, autoSaveWait = 500, ...rest }) => {
      const [state, dispatch] = useReducer(reducer, {
        edited: false,
        value: text.body,
      })

      const handleChange = useCallback(
        ({ currentTarget: { value } }) =>
          dispatch({ type: 'UPDATE_VALUE', value }),
        []
      )

      useDebounce(
        () => {
          dispatch({ type: 'BEGIN_SAVE' })

          state.edited &&
            updateEntity({
              variables: { id: text.id, value: state.value, type: 'TEXT' },
            })
              .catch(dispatchError)
              .then(() => dispatch({ type: 'COMPLETE_SAVE' }))
        },
        autoSaveWait,
        [state.value]
      )

      useEffect(() => {
        const confirm = e => {
          if (!state.edited) return
          e.preventDefault()
          e.returnValue = 'Are you sure?'
        }

        window.addEventListener('beforeunload', confirm)
        return () => {
          window.removeEventListener('beforeunload', confirm)
        }
      }, [state.edited])

      return (
        <Container {...rest}>
          {state.edited && <Status />}

          <textarea
            defaultValue={text.body}
            onChange={handleChange}
            autoFocus
          />
        </Container>
      )
    }
  )
)
