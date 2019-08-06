import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import Header from 'components/Header'
import { WithAlerts } from 'components/Alerts'
import { generate as generateHrefs } from 'util/hrefs'

import { sampleCollectionContentQuery } from './queries/sampleCollectionContent'

export const SampleCollectionContent = WithAlerts(({ id, dispatchError }) => {
  return (
    <Query
      query={sampleCollectionContentQuery}
      variables={{ id }}
      onError={dispatchError}
      fetchPolicy="network-only"
    >
      {({ data, loading, error }) => {
        if (error) return null

        if (loading) {
          return <Header isLoading />
        }

        const {
          me,
          me: {
            collection: { contents },
          },
        } = data

        const hrefs = generateHrefs(me)

        return <Redirect to={hrefs.content(contents[0])} />
      }}
    </Query>
  )
})
