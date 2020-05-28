import React from 'react'
import styled, { css } from 'styled-components'
import { Box, Pill, pillFocusMixin, PillProps, Tag } from '@auspices/eos'
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
    within {
      id
      title
    }
  }
`

const Title = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`

const Count = styled(Box)``

const Delta = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20%;
  opacity: 0;
  transition: opacity 125ms, transform 125ms;
  transform: translateX(-10%);
`

const selectedMixin = css`
  > ${Count} {
    color: ${themeGet('colors.secondary')};
  }

  > ${Delta} {
    opacity: 1;
    transform: translateX(0);
  }
`

const Container = styled(Pill)<PillProps & { selected?: boolean }>`
  ${({ selected }) =>
    selected &&
    css`
      ${selectedMixin}
      ${pillFocusMixin}
    `}

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
      <Title mr={collection.within.length > 0 ? 4 : 0}>
        {collection.title}
      </Title>

      {collection.within.map(({ id, title }) => (
        <Tag key={id} mx={2}>
          {title}
        </Tag>
      ))}

      <Count mx={4} color="tertiary">
        {collection.counts.contents || '∅'}
      </Count>

      <Delta color="tertiary" fontSize={0}>
        {collection.updatedAt}
      </Delta>
    </Container>
  )
}
