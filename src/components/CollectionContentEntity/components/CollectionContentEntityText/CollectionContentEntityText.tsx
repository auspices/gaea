import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Box, BoxProps } from '@auspices/eos'
import { themeGet } from '@styled-system/theme-get'
import { CollectionContentEntityTextFragment } from '../../../../generated/types/CollectionContentEntityTextFragment'

export const COLLECTION_CONTENT_ENTITY_TEXT_FRAGMENT = gql`
  fragment CollectionContentEntityTextFragment on Text {
    id
    body
  }
`

const Container = styled(Box).attrs({
  fontSize: 0,
  p: 3,
  m: 5,
  borderRadius: 4,
})<{ length: number }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${themeGet('colors.primary')};
  background-color: ${themeGet('colors.background')};
  max-height: 15rem;
  overflow: hidden;

  ${({ length }) =>
    length > 150 &&
    `
      &:after {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 4rem;
        background: linear-gradient(rgba(255, 255, 255, 0.001) 0%, ${themeGet(
          'background'
        )} 100%);
      }
  `}
`

type CollectionContentEntityTextProps = BoxProps & {
  text: CollectionContentEntityTextFragment
}

export const CollectionContentEntityText: React.FC<CollectionContentEntityTextProps> = ({
  text,
}) => <Container length={text.body.length}>{text.body}</Container>
