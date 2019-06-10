import gql from 'graphql-tag'

import headerFragment from 'components/Header/fragments/header'
import { contentEntityFragment } from 'components/ContentEntity/fragments/contentEntity'
import { contentEntityHeaderFragment } from 'components/ContentEntityHeader/fragments/contentEntityHeader'
import { contentSettingsFragment } from 'components/ContentSettings/fragments/contentSettings'

export default gql`
  query Content($id: ID!) {
    me {
      ...Header
    }
    content(id: $id) {
      __typename
      id
      collection {
        __typename
        id
        slug
        title
      }
      entity {
        ...ContentEntityHeader
        ...ContentEntity
      }
      ...ContentSettings
    }
  }
  ${headerFragment}
  ${contentEntityFragment}
  ${contentEntityHeaderFragment}
  ${contentSettingsFragment}
`
