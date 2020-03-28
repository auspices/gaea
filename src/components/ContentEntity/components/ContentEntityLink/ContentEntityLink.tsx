import React from 'react'
import gql from 'graphql-tag'
import { Box, BoxProps } from '@auspices/eos'
import { ContentEntityLinkFragment } from '../../../../generated/types/ContentEntityLinkFragment'

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
    <Box {...rest}>
      <Box
        as="a"
        href={link.url}
        display="block"
        textAlign="center"
        px={4}
        py={3}
        border="1px solid"
        borderColor="blue"
        borderRadius={4}
        color="blue"
        target="_blank"
      >
        open &lt;{link.url}&gt;
      </Box>
    </Box>
  )
}
