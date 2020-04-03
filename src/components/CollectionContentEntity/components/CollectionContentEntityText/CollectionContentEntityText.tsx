import React from 'react'
import gql from 'graphql-tag'
import styled, { css } from 'styled-components'
import { Box, BoxProps } from '@auspices/eos'
import { themeGet } from '@styled-system/theme-get'
import { CollectionContentEntityTextFragment } from '../../../../generated/types/CollectionContentEntityTextFragment'

export const COLLECTION_CONTENT_ENTITY_TEXT_FRAGMENT = gql`
  fragment CollectionContentEntityTextFragment on Text {
    id
    body: toString(length: 800)
  }
`

const Container = styled(Box).attrs({
  fontSize: 0,
  borderTop: '1px solid',
  borderColor: 'hint',
  color: 'primary',
  py: 3,
  px: [3, 0],
})<{ truncate: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  width: 100%;
  height: 100%;

  ${({ truncate, ...rest }) => {
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
            rgba(255, 255, 0, 0.001) 0%,
            ${themeGet('colors.background')(rest)} 100%
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
