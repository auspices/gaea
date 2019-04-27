import React from 'react'
import { Query } from 'react-apollo'

import contentQuery from './queries/content'

import { generate as generateHrefs } from 'util/hrefs'

import Box from 'components/UI/Box'
import Link from 'components/UI/Link'
import Header from 'components/Header'
import { ContentDisplay } from 'components/ContentDisplay'
import { WithAlerts } from 'components/Alerts'

export default WithAlerts(({ id, type, dispatchError }) => {
  return (
    <Query
      query={contentQuery}
      variables={{ id, type }}
      onError={dispatchError}
    >
      {({ data, loading, error }) => {
        if (error) return null

        if (loading) {
          return <Header isLoading />
        }

        const {
          me,
          me: { username },
          content,
        } = data

        const hrefs = generateHrefs(me)

        return (
          <>
            <Header>
              <Link to={hrefs.collections}>{username}</Link>

              <Link href={content.url}>
                {content.width}×{content.height}
              </Link>

              <Link
                href={`https://www.google.com/searchbyimage?&image_url=${
                  content.url
                }`}
              >
                Reverse Image Search
              </Link>
            </Header>

            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              mt={6}
              p={6}
              borderRadius={4}
            >
              <ContentDisplay content={content} />
            </Box>
          </>
        )
      }}
    </Query>
  )
})
