import React from 'react'
import { gql } from 'graphql-tag'
import { Box, BoxProps, EmptyFrame, Truncate } from '@auspices/eos'
import { ContentEntityAttachmentFragment } from '../../../generated/graphql'

export const CONTENT_ENTITY_ATTACHMENT_FRAGMENT = gql`
  fragment ContentEntityAttachmentFragment on Attachment {
    id
    url
    name: toString(length: 35, from: CENTER)
    fileSize
    contentType
  }
`

type ContentEntityAttachmentProps = BoxProps & {
  attachment: ContentEntityAttachmentFragment
}

export const ContentEntityAttachment: React.FC<
  ContentEntityAttachmentProps
> = ({ attachment, ...rest }) => {
  return (
    <Box
      as="a"
      href={attachment.url}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      flex={1}
      border="1px solid"
      borderColor="secondary"
      color="secondary"
      target="_blank"
      {...rest}
    >
      <Box borderBottom="1px solid" borderColor="secondary" px={4} py={3}>
        <Truncate>
          open &lt;{attachment.name}&gt; {attachment.contentType} (
          {attachment.fileSize}) in new tab
        </Truncate>
      </Box>

      <EmptyFrame width="100%" height="100%" flex="1" color="secondary" />
    </Box>
  )
}
