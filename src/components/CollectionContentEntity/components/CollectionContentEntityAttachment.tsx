import React from 'react'
import styled from 'styled-components'
import { gql } from 'graphql-tag'
import { Box, BoxProps } from '@auspices/eos'
import { CollectionContentEntityAttachmentFragment } from '../../../generated/types/CollectionContentEntityAttachmentFragment'

export const COLLECTION_CONTENT_ENTITY_ATTACHMENT_FRAGMENT = gql`
  fragment CollectionContentEntityAttachmentFragment on Attachment {
    id
    url
    fileSize
    contentType
  }
`

const Container = styled(Box)``

type CollectionContentEntityAttachmentProps = BoxProps & {
  attachment: CollectionContentEntityAttachmentFragment
}

export const CollectionContentEntityAttachment: React.FC<CollectionContentEntityAttachmentProps> =
  ({ attachment, ...rest }) => {
    return (
      <Container
        border="1px solid"
        borderColor="secondary"
        borderRadius={4}
        color="primary"
        fontSize={0}
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        {...rest}
      >
        <Box
          px={4}
          py={3}
          borderBottom="1px solid"
          borderColor="secondary"
          color="secondary"
        >
          {attachment.contentType} ({attachment.fileSize})
        </Box>
      </Container>
    )
  }
