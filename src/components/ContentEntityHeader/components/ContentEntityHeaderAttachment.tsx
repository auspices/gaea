import React from 'react'
import { gql } from 'graphql-tag'
import { Dropdown, PaneOption } from '@auspices/eos'
import { ContentEntityHeaderAttachmentFragment } from '../../../generated/types/ContentEntityHeaderAttachmentFragment'
import { Z } from '../../../util/zIndexes'

export const CONTENT_ENTITY_HEADER_ATTACHMENT_FRAGMENT = gql`
  fragment ContentEntityHeaderAttachmentFragment on Attachment {
    id
    url
    name: toString(length: 35, from: CENTER)
  }
`

export type ContentEntityHeaderAttachmentProps = {
  attachment: ContentEntityHeaderAttachmentFragment
}

export const ContentEntityHeaderAttachment: React.FC<ContentEntityHeaderAttachmentProps> =
  ({ attachment, ...rest }) => {
    return (
      <Dropdown label={attachment.name} flex="1" zIndex={Z.DROPDOWN} {...rest}>
        <PaneOption as="a" href={attachment.url} target="_blank">
          open in new tab
        </PaneOption>
      </Dropdown>
    )
  }
