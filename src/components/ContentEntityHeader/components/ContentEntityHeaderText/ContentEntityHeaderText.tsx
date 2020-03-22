import React from 'react'
import gql from 'graphql-tag'
import { Button } from '@auspices/eos'
import { ContentEntityHeaderTextFragment } from '../../../../generated/types/ContentEntityHeaderTextFragment'

export const CONTENT_ENTITY_HEADER_TEXT_FRAGMENT = gql`
  fragment ContentEntityHeaderTextFragment on Text {
    id
    body
  }
`

export type ContentEntityHeaderTextProps = {
  text: ContentEntityHeaderTextFragment
}

export const ContentEntityHeaderText: React.FC<ContentEntityHeaderTextProps> = ({
  text,
}) => {
  return (
    <Button
      as="a"
      href={`https://www.google.com/search?q=${text.body}`}
      target="_blank"
      flex="1"
    >
      search
    </Button>
  )
}
