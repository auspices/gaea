import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'

import removeFromCollectionMutation from './mutations/removeFromCollection'

import { Button } from 'components/UI/Buttons'

const Container = styled(Button).attrs({
  fontSize: 5,
  color: 'white',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: red;

  &:hover {
    background-color: gray;
  }
`

const RemoveFromCollection = ({
  contentId,
  contentType,
  collectionId,
  removeFromCollection,
  page,
  per,
  ...rest
}) => {
  const handleClick = e => {
    e.preventDefault()

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
    })
      .then(console.log.bind(console))
      .catch(console.error.bind(console))
  }

  return <Container onClick={handleClick} {...rest} />
}

export default graphql(removeFromCollectionMutation, {
  name: 'removeFromCollection',
})(RemoveFromCollection)
