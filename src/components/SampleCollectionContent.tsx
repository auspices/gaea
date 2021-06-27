import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { gql } from 'graphql-tag'
import { Button, ButtonProps, useAlerts } from '@auspices/eos'
import {
  SampleCollectionContentQuery,
  SampleCollectionContentQueryVariables,
} from '../generated/types/SampleCollectionContentQuery'
import { errorMessage } from '../util/errors'
import { useHrefs } from '../hooks'

export const SAMPLE_COLLECTION_CONTENT_QUERY = gql`
  query SampleCollectionContentQuery($id: ID!) {
    me {
      id
      slug
      collection(id: $id) {
        id
        contents: sample(amount: 1) {
          id
        }
      }
    }
  }
`

type SampleCollectionContentProps = ButtonProps & {
  id: string
}

enum Mode {
  Resting,
  Redirecting,
}

export const SampleCollectionContent: React.FC<SampleCollectionContentProps> =
  ({ id, children, ...rest }) => {
    const { sendError } = useAlerts()

    const hrefs = useHrefs()

    const history = useHistory()

    const [mode, setMode] = useState(Mode.Resting)
    const handleClick = useCallback(() => setMode(Mode.Redirecting), [])

    const { data, loading, error } = useQuery<
      SampleCollectionContentQuery,
      SampleCollectionContentQueryVariables
    >(SAMPLE_COLLECTION_CONTENT_QUERY, {
      fetchPolicy: 'network-only',
      skip: mode !== Mode.Redirecting,
      variables: { id },
    })

    useEffect(() => {
      if (error) {
        sendError({ body: errorMessage(error) })
        setMode(Mode.Resting)
      }

      if (loading || !data) return

      const {
        me: {
          collection: { contents },
        },
      } = data

      const [{ id }] = contents

      history.push(hrefs.content(id))
    }, [data, error, history, hrefs, loading, sendError])

    return (
      <Button
        onClick={handleClick}
        disabled={mode === Mode.Redirecting}
        {...rest}
      >
        {children}
      </Button>
    )
  }
