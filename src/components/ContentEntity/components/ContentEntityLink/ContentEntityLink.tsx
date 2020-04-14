import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Box, BoxProps, themeGet } from '@auspices/eos'
import { ContentEntityLinkFragment } from '../../../../generated/types/ContentEntityLinkFragment'

const Null = styled(Box)`
  position: relative;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
        to bottom right,
        transparent calc(50% - 1px),
        ${themeGet('colors.external')},
        transparent calc(50% + 1px)
      ),
      linear-gradient(
        to bottom left,
        transparent calc(50% - 1px),
        ${themeGet('colors.external')},
        transparent calc(50% + 1px)
      );
  }
`

export const CONTENT_ENTITY_LINK_FRAGMENT = gql`
  fragment ContentEntityLinkFragment on Link {
    id
    url
  }
`

type ContentEntityLinkProps = BoxProps & {
  link: ContentEntityLinkFragment
}

export const ContentEntityLink: React.FC<ContentEntityLinkProps> = ({
  link,
  ...rest
}) => {
  return (
    <Box
      as="a"
      href={link.url}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      flex={1}
      border="1px solid"
      borderColor="external"
      color="external"
      target="_blank"
      {...rest}
    >
      <Box borderBottom="1px solid" borderColor="external" px={4} py={3}>
        open &lt;{link.url}&gt; in new tab
      </Box>

      <Null width="100%" height="100%" flex="1" />
    </Box>
  )
}
