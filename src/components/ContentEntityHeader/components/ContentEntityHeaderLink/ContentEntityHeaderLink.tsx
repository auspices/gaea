import React from 'react'
import gql from 'graphql-tag'
import { Button } from '@auspices/eos'
import { ContentEntityHeaderLinkFragment } from '../../../../generated/types/ContentEntityHeaderLinkFragment'

export const CONTENT_ENTITY_HEADER_LINK_FRAGMENT = gql`
  fragment ContentEntityHeaderLinkFragment on Link {
    id
    name
    url
  }
`

export type ContentEntityHeaderLinkProps = {
  link: ContentEntityHeaderLinkFragment
}

export const ContentEntityHeaderLink: React.FC<ContentEntityHeaderLinkProps> = ({
  link,
  ...rest
}) => {
  return (
    <Button as="a" href={link.url} target="_blank" flex="1" {...rest}>
      {link.name}
    </Button>
  )
}
