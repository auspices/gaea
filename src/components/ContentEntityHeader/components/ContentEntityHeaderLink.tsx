import React from 'react'
import { gql } from 'graphql-tag'
import { Dropdown, PaneOption } from '@auspices/eos'
import { ContentEntityHeaderLinkFragment } from '../../../generated/graphql'
import { Z } from '../../../util/zIndexes'

export const CONTENT_ENTITY_HEADER_LINK_FRAGMENT = gql`
  fragment ContentEntityHeaderLinkFragment on Link {
    id
    url
    name: toString(length: 35, from: CENTER)
  }
`

export type ContentEntityHeaderLinkProps = {
  link: ContentEntityHeaderLinkFragment
}

export const ContentEntityHeaderLink: React.FC<
  ContentEntityHeaderLinkProps
> = ({ link, ...rest }) => {
  return (
    <Dropdown label={link.name} flex="1" zIndex={Z.DROPDOWN} {...rest}>
      <PaneOption as="a" href={link.url} target="_blank">
        open in new tab
      </PaneOption>
    </Dropdown>
  )
}
