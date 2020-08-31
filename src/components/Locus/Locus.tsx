import React, { useCallback, useEffect, useState } from 'react'
import { LocusOption, Modal } from '@auspices/eos'
import { useHistory } from 'react-router'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/client'
import { usePagination } from '../../hooks'
import * as hrefs from '../../hooks/useHrefs'
import { Z } from '../../util/zIndexes'
import { LocusMenu } from './LocusMenu'
import {
  LocusCollectionsQuery,
  LocusCollectionsQueryVariables,
} from '../../generated/types/LocusCollectionsQuery'

export const LOCUS_COLLECTIONS_QUERY = gql`
  query LocusCollectionsQuery($query: String!) {
    filtered: me {
      id
      collections(per: 5, query: $query) {
        id
        slug
        title
      }
    }
  }
`

enum Mode {
  Resting,
  Open,
}

export const Locus: React.FC = () => {
  const history = useHistory()

  const { page, per, encode } = usePagination()

  const [mode, setMode] = useState(Mode.Resting)

  const toggleMode = useCallback(() => {
    setMode(
      (prevMode) =>
        ({ [Mode.Resting]: Mode.Open, [Mode.Open]: Mode.Resting }[prevMode])
    )
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // <cmd+k>
      if (event.metaKey && event.key === 'k') {
        event.preventDefault()
        toggleMode()
      }

      // <esc>
      if (event.key === 'Escape') {
        setMode(Mode.Resting)
      }
    },
    [toggleMode]
  )

  const handleClose = () => setMode(Mode.Resting)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const [getCollections, { loading, data, error }] = useLazyQuery<
    LocusCollectionsQuery,
    LocusCollectionsQueryVariables
  >(LOCUS_COLLECTIONS_QUERY)

  const [options, setOptions] = useState<LocusOption[]>([])

  const handleChange = useCallback(
    (query: string) => {
      // Reset to default
      if (query === '') {
        setOptions([
          {
            label: `go to next page`,
            onClick: () =>
              history.push({ search: encode({ page: page + 1, per }) }),
          },
          ...(page !== 1
            ? [
                {
                  label: `go to previous page`,
                  onClick: () =>
                    history.push({ search: encode({ page: page - 1, per }) }),
                },
              ]
            : []),
        ])
        return
      }

      // Search
      getCollections({ variables: { query } })
    },
    [encode, getCollections, history, page, per]
  )

  useEffect(() => {
    if (error || loading || !data) return

    const {
      filtered: { collections },
    } = data

    if (collections.length === 0) return

    setOptions(
      collections.map(({ title, slug }) => {
        return {
          label: title,
          onClick: () => {
            history.push(hrefs.collection(slug))
          },
        }
      })
    )
  }, [data, error, history, loading])

  if (mode === Mode.Resting) return null

  return (
    <Modal overlay zIndex={Z.MODAL} onClose={handleClose}>
      <LocusMenu
        options={options}
        waitForInteractive={false}
        onChange={handleChange}
        onEnter={handleClose}
      />
    </Modal>
  )
}
