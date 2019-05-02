import React, { useState, useCallback } from 'react'
import { graphql } from 'react-apollo'

import { TextInput } from 'components/UI/Inputs'
import { WithAlerts } from 'components/Alerts'

import addToCollectionMutation from './mutations/addToCollection'

export const AddToCollection = ({
  per,
  addToCollection,
  collection,
  dispatchAlert,
  dispatchError,
}) => {
  const [mode, setMode] = useState('resting')
  const [value, setValue] = useState('')
  const [inputKey, setInputKey] = useState(new Date().getTime())

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()

      setMode('adding')

      addToCollection({
        variables: {
          id: collection.id,
          url: value,
          page: 1,
          per,
        },
      })
        .then(() => {
          dispatchAlert('Added successfully')
          setMode('resting')
          setInputKey(new Date().getTime())
        })
        .catch(err => {
          dispatchError(err)
          setMode('error')
        })
    },
    [addToCollection, collection.id, dispatchAlert, dispatchError, per, value]
  )

  const handleChange = useCallback(
    ({ target: { value } }) => setValue(value),
    []
  )

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          key={inputKey}
          placeholder="add to this collection"
          onChange={handleChange}
          disabled={mode === 'adding'}
          required
          autoFocus
        />
      </form>
    </>
  )
}

export default graphql(addToCollectionMutation, {
  name: 'addToCollection',
})(WithAlerts(AddToCollection))
