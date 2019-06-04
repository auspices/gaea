import gql from 'graphql-tag'

import { contentEntityImageFragment } from '../components/ContentEntityImage/fragments/contentEntityImage'
import { contentEntityTextFragment } from '../components/ContentEntityText/fragments/contentEntityText'

export const contentEntityFragment = gql`
  fragment ContentEntity on Entity {
    ... on Image {
      ...ContentEntityImage
    }
    ... on Text {
      ...ContentEntityText
    }
  }
  ${contentEntityImageFragment}
  ${contentEntityTextFragment}
`
