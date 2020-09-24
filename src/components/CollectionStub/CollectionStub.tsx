import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Button,
  ButtonProps,
  color,
  colorHash,
  space,
  themeGet,
  Tooltip,
} from '@auspices/eos'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import scrollIntoView from 'scroll-into-view-if-needed'
import { useHrefs } from '../../hooks'
import { CollectionStubFragment } from '../../generated/types/CollectionStubFragment'

export const COLLECTION_STUB_FRAGMENT = gql`
  fragment CollectionStubFragment on Collection {
    id
    slug
    key
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

  ${({ highlighted }) => highlighted && highlightedMixin}
  &:hover {
    ${highlightedMixin}
  }
`

export const Indicator = styled(Box).attrs({ mr: 4 })`
  position: relative;
  z-index: 1;
  width: ${themeGet('space.4')};
  height: ${themeGet('space.4')};
  border-radius: 50%;
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
      <Title mr={collection.within.length > 0 ? 4 : 0}>
        {collection.title}
      </Title>

      <Count mx={4} color="tertiary">
        {collection.counts.contents || '∅'}
      </Count>

      {collection.key ? <Indicator bg="accent" /> : <Indicator bg="hint" />}

      <Delta color="tertiary" fontSize={0}>
        {collection.updatedAt}
      </Delta>

      <Box position="absolute" top={0} right={0} bottom={0} display="flex">
        {collection.within.length > 0 &&
          collection.within.map(({ id, title }) => {
            return (
              <Tooltip
                key={id}
                label={<Box style={{ whiteSpace: 'nowrap' }}>{title}</Box>}
                placement="left"
              >
                <Box bg={colorHash(title)} height="100%" width={space(3)} />
              </Tooltip>
            )
          })}
      </Box>
    </Container>
  )
}
