import React from 'react'
import { gql } from 'graphql-tag'
import { Dropdown, PaneOption } from '@auspices/eos'
import { ContentEntityHeaderTextFragment } from '../../../generated/types/ContentEntityHeaderTextFragment'
import { Z } from '../../../util/zIndexes'

export const CONTENT_ENTITY_HEADER_TEXT_FRAGMENT = gql`
  fragment ContentEntityHeaderTextFragment on Text {
    id
    body
    name: toString(length: 35, from: TAIL)
  }
`

export type ContentEntityHeaderTextProps = {
  text: ContentEntityHeaderTextFragment
}

export const ContentEntityHeaderText: React.FC<ContentEntityHeaderTextProps> =
  ({ text, ...rest }) => {
    return (
      <Dropdown label={text.name} flex="1" zIndex={Z.DROPDOWN} {...rest}>
        <PaneOption
          as="a"
          href={`https://www.google.com/search?q=${text.body}`}
          target="_blank"
        >
          search for "{text.name}"
        </PaneOption>
      </Dropdown>
    )
  }
