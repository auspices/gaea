import React from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Button, Caret, Field, Pill, Stack } from '@auspices/eos'
import { useHrefs } from '../../hooks'
import { Loading } from '../../components/Loading'

export const COLLECTION_SETTINGS_PAGE_QUERY = gql`
  query CollectionSettingsPageQuery($id: ID!) {
    me {
      id
      slug
      username
      collection(id: $id) {
        id
        slug
        title
      }
    }
  }
`

type CollectionSettingsPageProps = {
  id: string
}

export const CollectionSettingsPage: React.FC<CollectionSettingsPageProps> = ({
  id,
}) => {
  const { data, loading, error } = useQuery(COLLECTION_SETTINGS_PAGE_QUERY, {
    variables: { id },
  })

  const hrefs = useHrefs()

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me,
    me: { collection },
  } = data

  return (
    <Stack flex="1">
      <Stack direction="horizontal">
        <Button as={Link} to={hrefs.collections()}>
          <Caret direction="left" mr={3} />
          {me.username}
        </Button>

        <Button as={Link} to={hrefs.collection(collection.slug)}>
          <Caret direction="left" mr={3} />
          {collection.title}
        </Button>

        <Pill flex="1">settings</Pill>
      </Stack>

      <Field
        label="title"
        input={{ value: collection.title, readOnly: true }}
      />
    </Stack>
  )
}
