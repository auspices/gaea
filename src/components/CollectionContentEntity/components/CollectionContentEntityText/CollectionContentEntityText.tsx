import React from 'react'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import { Box, BoxProps, color } from '@auspices/eos'
import { CollectionContentEntityTextFragment } from '../../../../generated/types/CollectionContentEntityTextFragment'

export const COLLECTION_CONTENT_ENTITY_TEXT_FRAGMENT = gql`
  fragment CollectionContentEntityTextFragment on Text {
    id
    body: toString(length: 800)
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
})<{ truncate: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  width: 100%;
  height: 100%;

  ${({ truncate }) => {
    return (
      truncate &&
      css`
        &:after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 4rem;
          background: linear-gradient(
            ${color('background', 0.001)} 0%,
            ${color('background')} 100%
          );
        }
      `
    )
  }}
`

type CollectionContentEntityTextProps = BoxProps & {
  text: CollectionContentEntityTextFragment
}

export const CollectionContentEntityText: React.FC<CollectionContentEntityTextProps> = ({
  text,
}) => <Container truncate={text.body.length > 500}>{text.body}</Container>
