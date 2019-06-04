import gql from 'graphql-tag'

import { contentEntityHeaderImageFragment } from '../components/ContentEntityHeaderImage/fragments/contentEntityHeaderImage'
import { contentEntityHeaderTextFragment } from '../components/ContentEntityHeaderText/fragments/contentEntityHeaderText'

export const contentEntityHeaderFragment = gql`
  fragment ContentEntityHeader on Entity {
    ... on Image {
      ...ContentEntityHeaderImage
    }
    ... on Text {
      ...ContentEntityHeaderText
    }
  }
  ${contentEntityHeaderImageFragment}
  ${contentEntityHeaderTextFragment}
`
