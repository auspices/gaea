import React, { useState, useCallback } from 'react'
import { graphql } from 'react-apollo'

import removeFromCollectionMutation from './mutations/removeFromCollection'

import { Button } from 'components/UI/Buttons'

const RemoveFromCollection = ({
  children,
  contentId,
  contentType,
  collectionId,
  removeFromCollection,
  page,
  per,
  ...rest
}) => {
  const [mode, setMode] = useState('resting')

  const handleClick = useCallback(
    e => {
      e.preventDefault()

      setMode('deleting')

      removeFromCollection({
        variables: {
          connection: {
            contentId,
            contentType,
            collectionId,
            page,
            per,
          },
        },
      }).catch(err => {
        console.error(err)
        setMode('error')
      })
    },
    [collectionId, contentId, contentType, page, per, removeFromCollection]
  )

  return (
    <Button onClick={handleClick} disabled={mode !== 'resting'} {...rest}>
      {children}
    </Button>
  )
}

export default graphql(removeFromCollectionMutation, {
  name: 'removeFromCollection',
})(RemoveFromCollection)
