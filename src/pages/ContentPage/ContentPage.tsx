import React, { useCallback, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link, useHistory } from 'react-router-dom'
import { Box, Button, Stack } from '@auspices/eos'
import { useHrefs } from '../../hooks/useHrefs'
import { Loading } from '../../components/Loading'
import {
  CONTENT_ENTITY_FRAGMENT,
  ContentEntity,
} from '../../components/ContentEntity'
import {
  CONTENT_ENTITY_HEADER_FRAGMENT,
  ContentEntityHeader,
} from '../../components/ContentEntityHeader'
import {
  CONTENT_SETTINGS_FRAGMENT,
  ContentSettings,
} from '../../components/ContentSettings'
import { SampleCollectionContent } from '../../components/SampleCollectionContent'
import {
  ContentPageQuery,
  ContentPageQueryVariables,
} from '../../generated/types/ContentPageQuery'

export const CONTENT_PAGE_QUERY = gql`
  query ContentPageQuery($id: ID!) {
    me {
      id
      slug
      username
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
        next {
          id
        }
        previous {
          id
        }
        ...ContentSettingsFragment
      }
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
  const history = useHistory()

  const hrefs = useHrefs()

  const { data, loading, error } = useQuery<
    ContentPageQuery,
    ContentPageQueryVariables
  >(CONTENT_PAGE_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id },
  })

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (loading || !data) return

      // Only bind navigation arrows if nothing else has focus
      if (document.activeElement?.tagName !== 'BODY') return

      const {
        me: {
          content,
          content: { collection },
        },
      } = data

      switch (key) {
        case 'ArrowUp':
          history.push(hrefs.collection(collection.slug))
          break
        case 'ArrowRight':
          content.next && history.push(hrefs.content(content.next.id))
          break
        case 'ArrowLeft':
          content.previous && history.push(hrefs.content(content.previous.id))
          break
      }
    },
    [data, history, hrefs, loading]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [handleKeydown])

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me: {
      username,
      content,
      content: { collection, entity },
    },
  } = data

  return (
    <Stack flex="1">
      <Stack direction={['vertical', 'vertical', 'horizontal']}>
        <Stack direction="horizontal">
          <Button as={Link} to={hrefs.collections()}>
            {username}
          </Button>

          <Button flex="1" as={Link} to={hrefs.collection(collection.slug)}>
            {collection.title}
          </Button>
        </Stack>

        <ContentEntityHeader entity={entity} />

        <Stack direction="horizontal">
          {content.previous && (
            <Button flex="1" as={Link} to={hrefs.content(content.previous.id)}>
              past
            </Button>
          )}

          {content.next && (
            <Button flex="1" as={Link} to={hrefs.content(content.next.id)}>
              next
            </Button>
          )}

          <SampleCollectionContent flex="1" id={collection.slug}>
            rand
          </SampleCollectionContent>
        </Stack>
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
