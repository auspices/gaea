import React from 'react'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import { Box, BoxProps, color } from '@auspices/eos'
import { CollectionContentEntityTextFragment } from '../../../generated/types/CollectionContentEntityTextFragment'

export const COLLECTION_CONTENT_ENTITY_TEXT_FRAGMENT = gql`
  fragment CollectionContentEntityTextFragment on Text {
    id
    body: toString(length: 800)
  }
`

const FadeOut = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to top, transparent 0%, black 33%);
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
      {true ? <FadeOut>{text.body}</FadeOut> : <>{text.body}</>}
    </Container>
  )
}
