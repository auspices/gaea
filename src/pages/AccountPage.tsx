import React from 'react'
import { gql } from 'graphql-tag'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Helmet } from 'react-helmet'
import {
  Button,
  Caret,
  Cell,
  Field,
  Loading,
  Stack,
  useThemer,
} from '@auspices/eos'
import { useHrefs } from '../hooks'
import { AccountPageQuery } from '../generated/graphql'

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

  const { data, error, loading } =
    useQuery<AccountPageQuery>(ACCOUNT_PAGE_QUERY)

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const { me } = data

  return (
    <>
      <Helmet>
        <title>{['account', me.username].join(' / ')}</title>
      </Helmet>

      <Stack flex="1">
        <Stack direction="horizontal">
          <Button as={Link} to={hrefs.collections()}>
            <Caret direction="left" mr={3} />
            {me.username}
          </Button>

          <Cell flex="1">settings</Cell>
        </Stack>

        <Field
          label="username"
          input={{ value: me.username, readOnly: true }}
        />

        <Field label="email" input={{ value: me.email, readOnly: true }} />

        <Field
          label="created"
          input={{ value: me.createdAt, readOnly: true }}
        />

        <Field label="color scheme">
          <Button width="100%" onClick={toggleScheme}>
            {scheme}
          </Button>
        </Field>
      </Stack>
    </>
  )
}
