import React from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  hexToRgb,
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
  flex: 1;
`

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

const Tags = styled(Stack).attrs({
  pr: 6,
})`
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${themeGet('space.6')};
    background: linear-gradient(
      to right,
      ${(props) => {
          // TODO: Extract a helper
          const background = themeGet('colors.background')(props)
          const { r, g, b } = hexToRgb(background)
          return `rgba(${[r, g, b].join(',')}, 0.1)`
        }}
        0%,
      ${themeGet('colors.background')} 100%
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
