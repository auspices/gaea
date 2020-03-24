import React from 'react'
import styled, { css } from 'styled-components'
import { Box, Pill, PillProps } from '@auspices/eos'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { themeGet } from '@styled-system/theme-get'
import { useHrefs } from '../../hooks'
import { CollectionStubFragment } from '../../generated/types/CollectionStubFragment'

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

const Title = styled(Box)``
const Count = styled(Box)``
const Delta = styled(Box)`
  opacity: 0;
  transition: opacity 125ms;
`

const selectedMixin = css`
  > ${Title} {
    text-decoration: underline;
  }

  > ${Count} {
    color: ${themeGet('colors.secondary')};
  }

  > ${Delta} {
    opacity: 1;
  }
`

const Container = styled(Pill)<PillProps & { selected?: boolean }>`
  text-decoration: none;

  ${({ selected }) => selected && selectedMixin}

  &:hover {
    ${selectedMixin}
  }
`

export type CollectionStubProps = {
  collection: CollectionStubFragment
  selected?: boolean
}

export const CollectionStub: React.FC<CollectionStubProps> = ({
  collection,
  selected,
  ...rest
}) => {
  const hrefs = useHrefs()

  return (
    <Container
      as={Link}
      to={hrefs.collection(collection.slug)}
      selected={selected}
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
