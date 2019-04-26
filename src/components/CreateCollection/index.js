import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import createCollectionMutation from './mutations/createCollection'

import { TextInput } from '../UI/Inputs'

const CreateCollection = ({ createCollection }) => {
  const [mode, setMode] = useState('resting')
  const [title, setTitle] = useState('')
  const [collection, setCollection] = useState(null)

  const handleChange = ({ target: { value } }) => setTitle(value)

  const handleSubmit = e => {
    e.preventDefault()

    setMode('creating')

    createCollection({ variables: { title } })
      .then(({ data }) => {
        setCollection(data.createCollection.collection)
        setMode('created')
      })
      .catch(() => setMode('error'))
  }

  return (
    <>
      {mode === 'created' && <Redirect to={`/collections/${collection.id}`} />}

      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="new collection"
          onChange={handleChange}
          disabled={mode === 'adding'}
          required
          autoFocus
        />
      </form>
    </>
  )
}

export default graphql(createCollectionMutation, {
  name: 'createCollection',
})(CreateCollection)
