import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { Box, Button, Stack } from '@auspices/eos'
import { generate as generateHrefs } from '../../util/hrefs'
import { Loading } from '../../components/Loading'
import {
  CONTENT_ENTITY_FRAGMENT,
  ContentEntity,
} from '../../components/ContentEntity'
import {
  CONTENT_ENTITY_HEADER_FRAGMENT,
  ContentEntityHeader,
} from '../../components/ContentEntityHeader'
import { errorMessage } from '../../util/errors'
import {
  CONTENT_SETTINGS_FRAGMENT,
  ContentSettings,
} from '../../components/ContentSettings'
import { SampleCollectionContent } from '../../components/SampleCollectionContent'

export const CONTENT_PAGE_QUERY = gql`
  query ContentPageQuery($id: ID!) {
    me {
      id
      slug
      username
    }
    content(id: $id) {
      id
      collection {
        id
        slug
        title
      }
      entity {
        ...ContentEntityHeaderFragment
        ...ContentEntityFragment
      }
      ...ContentSettingsFragment
    }
  }
  ${CONTENT_ENTITY_FRAGMENT}
  ${CONTENT_ENTITY_HEADER_FRAGMENT}
  ${CONTENT_SETTINGS_FRAGMENT}
`

type ContentPageProps = {
  id: string
}

export const ContentPage: React.FC<ContentPageProps> = ({ id }) => {
  const { data, loading, error } = useQuery(CONTENT_PAGE_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id },
  })

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me,
    me: { username },
    content,
    content: { collection, entity },
  } = data

  const hrefs = generateHrefs(me)

  return (
    <Stack flex="1">
      <Stack direction="horizontal">
        <Button as={Link} to={hrefs.collections}>
          {username}
        </Button>

        <Button as={Link} to={`${hrefs.collection(collection)}`}>
          {collection.title}
        </Button>

        <ContentEntityHeader entity={entity} />

        <SampleCollectionContent id={collection.id}>
          random
        </SampleCollectionContent>
      </Stack>

      <ContentSettings content={content} />

      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        flex={1}
      >
        <ContentEntity entity={entity} />
      </Box>
    </Stack>
  )
}
