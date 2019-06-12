import gql from 'graphql-tag'

import { contentEntityHeaderImageFragment } from '../components/ContentEntityHeaderImage/fragments/contentEntityHeaderImage'
import { contentEntityHeaderTextFragment } from '../components/ContentEntityHeaderText/fragments/contentEntityHeaderText'
import { contentEntityHeaderLinkFragment } from '../components/ContentEntityHeaderLink/fragments/contentEntityHeaderLink'

export const contentEntityHeaderFragment = gql`
  fragment ContentEntityHeader on Entity {
    ... on Image {
      ...ContentEntityHeaderImage
    }
    ... on Text {
      ...ContentEntityHeaderText
    }
    ... on Link {
      ...ContentEntityHeaderLink
    }
  }
  ${contentEntityHeaderImageFragment}
  ${contentEntityHeaderTextFragment}
  ${contentEntityHeaderLinkFragment}
`
