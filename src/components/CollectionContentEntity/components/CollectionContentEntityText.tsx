import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Box, BoxProps } from '@auspices/eos'
import { CollectionContentEntityTextFragment } from '../../../generated/types/CollectionContentEntityTextFragment'
import { FadeOut } from '../../FadeOut'

export const COLLECTION_CONTENT_ENTITY_TEXT_FRAGMENT = gql`
  fragment CollectionContentEntityTextFragment on Text {
    id
    blurb: toString(length: 800)
  }
`
const Container = styled(Box).attrs({
  fontSize: 0,
  border: '1px solid',
  borderColor: 'hint',
  borderRadius: 2,
  color: 'primary',
  py: 2,
  px: 3,
})`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  white-space: pre-wrap;
`

type CollectionContentEntityTextProps = BoxProps & {
  text: CollectionContentEntityTextFragment
}

export const CollectionContentEntityText: React.FC<CollectionContentEntityTextProps> = ({
  text,
}) => {
  return (
    <Container>
      {text.blurb.length > 500 ? (
        <FadeOut>{text.blurb}</FadeOut>
      ) : (
        <>{text.blurb}</>
      )}
    </Container>
  )
}
