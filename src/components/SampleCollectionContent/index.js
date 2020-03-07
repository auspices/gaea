import React, { useCallback, useState } from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { generate as generateHrefs } from '../../util/hrefs'

import { WithAlerts } from '../../components/Alerts'

import { sampleCollectionContentQuery } from './queries/sampleCollectionContent'

import { Button } from '../../components/UI/Buttons'

export const SampleCollectionContent = WithAlerts(
  ({ id, dispatchError, children }) => {
    const [mode, setMode] = useState('resting')
    const handleClick = useCallback(() => setMode('redirecting'), [])

    return (
      <>
        <Button onClick={handleClick} disabled={mode === 'redirecting'}>
          {children}
        </Button>

        <Query
          query={sampleCollectionContentQuery}
          variables={{ id }}
          onError={dispatchError}
          fetchPolicy="network-only"
          skip={mode !== 'redirecting'}
        >
          {({ data, loading, error }) => {
            if (mode !== 'redirecting') return null
            if (error || loading) return null

            const {
              me,
              me: {
                collection: { contents },
              },
            } = data

            const hrefs = generateHrefs(me)

            return <Redirect push to={hrefs.content(contents[0])} />
          }}
        </Query>
      </>
    )
  }
)
