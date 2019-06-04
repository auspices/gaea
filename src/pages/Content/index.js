import React from 'react'
import { Query } from 'react-apollo'

import contentQuery from './queries/content'

import { generate as generateHrefs } from 'util/hrefs'

import { Box } from 'components/UI/Box'
import { Link } from 'components/UI/Link'
import { Header } from 'components/Header'
import { ContentEntity } from 'components/ContentEntity'
import { ContentEntityHeader } from 'components/ContentEntityHeader'
import { WithAlerts } from 'components/Alerts'

export default WithAlerts(({ id, dispatchError }) => {
  return (
    <Query query={contentQuery} variables={{ id }} onError={dispatchError}>
      {({ data, loading, error }) => {
        if (error) return null

        if (loading) {
          return <Header isLoading />
        }

        const {
          me,
          me: { username },
          content: { collection, entity },
        } = data

        const hrefs = generateHrefs(me)

        return (
          <>
            <Header>
              <Link to={hrefs.collections}>{username}</Link>
              <Link to={hrefs.collection(collection)}>{collection.title}</Link>

              <ContentEntityHeader entity={entity} />
            </Header>

            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={6}
              p={6}
              borderRadius={4}
            >
              <ContentEntity entity={entity} />
            </Box>
          </>
        )
      }}
    </Query>
  )
})
