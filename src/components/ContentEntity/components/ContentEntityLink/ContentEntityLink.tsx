import React from 'react'
import gql from 'graphql-tag'
import { Box, BoxProps, EmptyFrame, Truncate } from '@auspices/eos'
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
        <Truncate>open &lt;{link.url}&gt; in new tab</Truncate>
      </Box>

      <EmptyFrame width="100%" height="100%" flex="1" color="external" />
    </Box>
  )
}
