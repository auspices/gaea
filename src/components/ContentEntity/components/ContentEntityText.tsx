import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { gql } from 'graphql-tag'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useDebounce } from 'use-debounce'
import { Box, Cell, Input, Split, Stack, useAlerts } from '@auspices/eos'
import { errorMessage } from '../../../util/errors'
import { ContentEntityTextFragment } from '../../../generated/graphql'
import { themeGet } from '@styled-system/theme-get'

export const CONTENT_ENTITY_TEXT_FRAGMENT = gql`
  fragment ContentEntityTextFragment on Text {
    id
    body
    updatedAt(relative: true)
  }
`

export const UPDATE_CONTENT_ENTITY_TEXT_MUTATION = gql`
  mutation UpdateContentEntityTextMutation(
    $id: ID!
    $type: EntityTypes!
    $value: String!
  ) {
    updateEntity(input: { id: $id, value: $value, type: $type }) {
      entity {
        ...ContentEntityTextFragment
        __typename
      }
    }
  }
  ${CONTENT_ENTITY_TEXT_FRAGMENT}
`

const Status = styled(Box).attrs({ m: 6 })`
  position: absolute;
  top: 0;
  right: 0;
  width: ${themeGet('space.3')};
  height: ${themeGet('space.3')};
  background-color: ${themeGet('colors.primary')};
  border-radius: 50%;
`

const Editor = styled(Input).attrs({
  flex: 1,
  p: 6,
})`
  resize: none;

  &:focus {
    box-shadow: none;
  }
`

type State = {
  edited: boolean
  value: string
}

type Action = { type: 'UPDATE'; payload: { value: string } } | { type: 'SAVED' }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        edited: true,
        value: action.payload.value,
      }

    case 'SAVED':
      return {
        ...state,
        edited: false,
      }
  }
}

export type ContentEntityTextProps = {
  text: ContentEntityTextFragment
}

export const ContentEntityText: React.FC<ContentEntityTextProps> = ({
  text,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { sendError } = useAlerts()

  const [updateEntity] = useMutation(UPDATE_CONTENT_ENTITY_TEXT_MUTATION)

  const [state, dispatch] = useReducer(reducer, {
    edited: false,
    value: text.body,
  })

  const handleChange = useCallback(
    ({
      currentTarget: { value },
    }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      dispatch({ type: 'UPDATE', payload: { value } }),
    []
  )

  const handleSave = useCallback(async () => {
    if (!state.edited) return

    try {
      await updateEntity({
        variables: { id: text.id, value: state.value, type: 'TEXT' },
      })
      dispatch({ type: 'SAVED' })
    } catch (err) {
      sendError({ body: errorMessage(err) })
    }
  }, [sendError, state.edited, state.value, text.id, updateEntity])

  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (!state.edited) return
      event.preventDefault()
      event.returnValue = 'Are you sure?'
    },
    [state.edited]
  )

  const [debouncedValue] = useDebounce(state.value, 500)

  useEffect(() => {
    handleSave()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [handleBeforeUnload, state.edited])

  return (
    <Stack flex={1} width="100%">
      <Box
        position="relative"
        display="flex"
        flex={1}
        flexDirection="column"
        {...rest}
      >
        {state.edited && <Status />}

        <Editor
          as="textarea"
          ref={textareaRef}
          defaultValue={text.body}
          onChange={handleChange}
        />
      </Box>

      <Split>
        <Cell variant="small" color="tertiary" borderColor="tertiary">
          last updated
        </Cell>

        <Cell variant="small" color="tertiary" borderColor="tertiary">
          {text.updatedAt}
        </Cell>
      </Split>
    </Stack>
  )
}
