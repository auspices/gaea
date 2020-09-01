import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from '@auspices/eos'
import { useHistory } from 'react-router'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/client'
import { usePagination } from '../../hooks'
import * as hrefs from '../../hooks/useHrefs'
import { Z } from '../../util/zIndexes'
import { LocusMenu } from './LocusMenu'
import { LocusOption } from './LocusOptions'
import {
  LocusCollectionsQuery,
  LocusCollectionsQueryVariables,
} from '../../generated/types/LocusCollectionsQuery'
import { Mode, useLocusToggle } from './useLocusToggle'

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

export const Locus: React.FC = () => {
  const history = useHistory()

  const { page, per, nextPage, prevPage, encode } = usePagination()

  const { mode, handleClose } = useLocusToggle()

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
          ...(nextPage !== page
            ? [
                {
                  label: `go to next page`,
                  onClick: () =>
                    history.push({ search: encode({ page: nextPage, per }) }),
                },
              ]
            : []),
          ...(prevPage !== page
            ? [
                {
                  label: `go to previous page`,
                  onClick: () =>
                    history.push({ search: encode({ page: prevPage, per }) }),
                },
              ]
            : []),
        ])
        return
      }

      // Search
      getCollections({ variables: { query } })
    },
    [encode, getCollections, history, nextPage, page, per, prevPage]
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
