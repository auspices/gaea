import React from 'react'
import gql from 'graphql-tag'
import { Box, BoxProps, Button } from '@auspices/eos'
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
      <Button as="a" href={link.url} target="_blank">
        &lt;{link.url}&gt;
      </Button>
    </Box>
  )
}
