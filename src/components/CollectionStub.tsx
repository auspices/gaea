import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Box, Button, ButtonProps, color } from '@auspices/eos'
import { Link } from 'react-router-dom'
import { gql } from 'graphql-tag'
import scrollIntoView from 'scroll-into-view-if-needed'
import { useHrefs } from '../hooks'
import { CollectionStubFragment } from '../generated/graphql'

export const COLLECTION_STUB_FRAGMENT = gql`
  fragment CollectionStubFragment on Collection {
    id
    slug
    title
    updatedAt(relative: true)
    counts {
      contents
    }
  }
`

const Title = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`

const Count = styled(Box)`
  position: relative;
  z-index: 1;
  text-shadow: 0 0 2px ${color('background')};
`

const Delta = styled(Box)`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20%;
  opacity: 0;
  transition: opacity 125ms, transform 125ms;
  transform: translateX(-10%);
`

const highlightedMixin = css`
  > ${Count} {
    color: ${color('secondary')};
  }

  > ${Delta} {
    opacity: 1;
    transform: translateX(0);
  }
`

const Container = styled(Button)<ButtonProps>`
  position: relative;
  justify-content: flex-start;
  width: 100%;

  ${({ highlighted }) => highlighted && highlightedMixin}
  &:hover {
    ${highlightedMixin}
  }
`

export type CollectionStubProps = {
  collection: CollectionStubFragment
  highlighted?: boolean
}

export const CollectionStub: React.FC<CollectionStubProps> = ({
  collection,
  highlighted,
  ...rest
}) => {
  const hrefs = useHrefs()
  const ref = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!ref.current || !highlighted) return
    scrollIntoView(ref.current, { scrollMode: 'if-needed', block: 'center' })
  }, [highlighted])

  return (
    <Container
      ref={ref}
      as={Link}
      to={hrefs.collection(collection.slug)}
      highlighted={highlighted}
      {...rest}
    >
      <Title>{collection.title}</Title>

      <Count mx={4} color="tertiary">
        {collection.counts.contents || '∅'}
      </Count>

      <Delta color="tertiary" fontSize={0}>
        {collection.updatedAt}
      </Delta>
    </Container>
  )
}
