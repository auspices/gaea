import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'

import { TextInput } from '../../components/UI/Inputs'
import { WithAlerts } from '../../components/Alerts'

import addToCollectionMutation from './mutations/addToCollection'

export const AddToCollection = WithAlerts(
  ({ page, per, collection, hrefs, dispatchAlert, dispatchError }) => {
    const [addToCollection] = useMutation(addToCollectionMutation)

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
            value,
            page: 1,
            per,
          },
        })
          .then(() => {
            dispatchAlert('Added successfully')
            setMode('added')
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
        {mode === 'added' && page !== 1 && (
          <Redirect to={hrefs.collection(collection)} />
        )}

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
)
