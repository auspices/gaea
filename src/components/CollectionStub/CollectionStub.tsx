import React from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  color,
  Pill,
  pillFocusMixin,
  PillProps,
  Stack,
  Tag,
  themeGet,
} from '@auspices/eos'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
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
      title: toString(length: 20, from: CENTER)
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

const selectedMixin = css`
  > ${Count} {
    color: ${color('secondary')};
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

const Tags = styled(Stack).attrs({
  pr: 8,
  mr: -8,
})`
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${themeGet('space.8')};
    background: linear-gradient(
      to right,
      ${color('background', 0.001)} 0%,
      ${color('background')} 50%
    );
  }

  /* TODO: Better handle tag truncation */
  > * {
    white-space: nowrap;
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

      {collection.within.length > 0 && (
        <Tags spacing={2} direction="horizontal">
          {collection.within.map(({ id, title }) => (
            <Tag key={id}>{title}</Tag>
          ))}
        </Tags>
      )}

      <Count mx={4} color="tertiary">
        {collection.counts.contents || '∅'}
      </Count>

      <Delta color="tertiary" fontSize={0}>
        {collection.updatedAt}
      </Delta>
    </Container>
  )
}
