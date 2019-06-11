import React, { useReducer, useCallback, useEffect } from 'react'
import { omit } from 'lodash'
import useDebounce from 'react-use/lib/useDebounce'

import { KeyValueInput } from 'components/UI/KeyValueInput'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FIELD':
      return {
        ...state,
        edited: true,
        schema: [
          ...state.schema,
          {
            name: action.name,
            type: 'string',
          },
        ],
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        edited: true,
        schema: state.schema.map((field, index) => {
          if (index !== action.index) return field

          return {
            key: field.key,
            name: action.newName,
            type: field.type,
          }
        }),
        data: {
          ...omit(state.data, action.oldName),
          [action.newName]: state.data[action.oldName],
        },
      }
    case 'UPDATE_VALUE':
      return {
        ...state,
        edited: true,
        data: {
          ...state.data,
          [action.key]: action.value,
        },
      }
    default:
      throw new Error()
  }
}

export const KeyValueEditor = ({
  schema: initialSchema,
  data: initialData,
  onChange = () => {},
  onSave = () => {},
  autoSaveWait = 500,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    schema: initialSchema.map(field => ({ key: field.name, ...field })),
    data: initialData,
  })

  const handleNameChange = useCallback(
    ({ name: oldName, index }) => ({ target: { value: newName } }) => {
      dispatch({
        type: 'UPDATE_NAME',
        oldName,
        newName,
        index,
      })
    },
    []
  )

  const handleValueChange = useCallback(
    key => ({ target: { value } }) => {
      dispatch({
        type: 'UPDATE_VALUE',
        key,
        value,
      })
    },
    []
  )

  const handleAddField = useCallback(({ target: { value: name } }) => {
    if (name === '') return

    dispatch({
      type: 'ADD_FIELD',
      name,
    })
  }, [])

  useEffect(() => {
    onChange(state.data)
  }, [onChange, state.data])

  useDebounce(
    () => {
      state.edited && onSave(state.data)
    },
    autoSaveWait,
    [state.data]
  )

  return (
    <>
      {state.schema.map((field, index) => (
        <KeyValueInput
          key={`kv:${index}`}
          k={{
            onChange: handleNameChange({ name: field.name, index }),
            placeholder: 'name',
            defaultValue: field.name,
            autoComplete: 'off',
          }}
          v={{
            onChange: handleValueChange(field.name),
            placeholder: field.name,
            defaultValue: state.data[field.name],
            autoComplete: 'off',
            autoFocus: index === state.schema.length - 1,
          }}
        />
      ))}

      <KeyValueInput
        key={new Date().getTime()}
        k={{
          onBlur: handleAddField,
          placeholder: 'add field',
          autoComplete: 'off',
        }}
      />
    </>
  )
}
