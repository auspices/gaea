import React from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Button, Field, Pill, Stack, useThemer } from '@auspices/eos'
import { useHrefs } from '../../hooks'
import { AccountPageQuery } from '../../generated/types/AccountPageQuery'
import { Loading } from '../../components/Loading'

export const ACCOUNT_PAGE_QUERY = gql`
  query AccountPageQuery {
    me {
      id
      slug
      username
      email
      createdAt(relative: true)
    }
  }
`

export const AccountPage: React.FC = () => {
  const { scheme, toggleScheme } = useThemer()

  const hrefs = useHrefs()

  const { data, error, loading } = useQuery<AccountPageQuery>(
    ACCOUNT_PAGE_QUERY
  )

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const { me } = data

  return (
    <Stack flex="1">
      <Button as={Link} to={hrefs.collections(me.slug)}>
        {me.username}
      </Button>

      <Field label="username" input={{ value: me.username, readOnly: true }} />

      <Field label="email" input={{ value: me.email, readOnly: true }} />

      <Field label="created" input={{ value: me.createdAt, readOnly: true }} />

      <Stack direction="horizontal">
        <Pill>color scheme</Pill>

        <Button flex="1" onClick={toggleScheme} textAlign="left">
          {scheme}
        </Button>
      </Stack>
    </Stack>
  )
}
