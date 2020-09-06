import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { Modal, Spinner } from '@auspices/eos'
import { useHistory } from 'react-router'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/client'
import { useMatchesPath, usePagination } from '../../hooks'
import * as hrefs from '../../hooks/useHrefs'
import { Z } from '../../util/zIndexes'
import { LocusOption } from './LocusOptions'
import {
  LocusCollectionsQuery,
  LocusCollectionsQueryVariables,
} from '../../generated/types/LocusCollectionsQuery'
import { Mode, useLocusToggle } from './useLocusToggle'

const LocusMenu = React.lazy(() => import('./LocusMenu'))

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

const addCommand = (
  condition: boolean,
  options: LocusOption | LocusOption[]
): LocusOption[] => {
  return condition ? [options].flat() : []
}

export const Locus: React.FC = () => {
  const history = useHistory()

  const { page, per, nextPage, prevPage, encode } = usePagination()

  const { mode, handleClose } = useLocusToggle()

  const [getCollections, { loading, data, error }] = useLazyQuery<
    LocusCollectionsQuery,
    LocusCollectionsQueryVariables
  >(LOCUS_COLLECTIONS_QUERY)

  const { matches } = useMatchesPath()

  const defaultOptions: LocusOption[] = [
    ...addCommand(
      nextPage !== page && (!!matches.collection || !!matches.collections),
      [
        {
          key: 'next',
          label: `go to next page`,
          onClick: () =>
            history.push({ search: encode({ page: nextPage, per }) }),
        },
      ]
    ),
    ...addCommand(
      prevPage !== page && (!!matches.collection || !!matches.collections),
      [
        {
          key: 'previous',
          label: `go to previous page`,
          onClick: () =>
            history.push({ search: encode({ page: prevPage, per }) }),
        },
      ]
    ),
    ...addCommand(!matches.collections, {
      key: 'home',
      label: 'go home',
      onClick: () => history.push(hrefs.root()),
    }),
  ]

  const [dynamicOptions, setDynamicOptions] = useState<LocusOption[]>([])

  const handleChange = useCallback((query: string) => {
    if (query === '') {
      setDynamicOptions([])
      return
    }
  }, [])

  const handleDebouncedChange = useCallback(
    (debouncedQuery: string) => {
      if (debouncedQuery === '') return
      getCollections({ variables: { query: debouncedQuery } })
    },
    [getCollections]
  )

  useEffect(() => {
    if (error || loading || !data) return

    const {
      filtered: { collections },
    } = data

    if (collections.length === 0) return

    setDynamicOptions(
      collections.map(({ title, slug }) => {
        return {
          key: title,
          label: `go to ${title}`,
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
      <Suspense fallback={<Spinner />}>
        <LocusMenu
          options={[...defaultOptions, ...dynamicOptions]}
          onChange={handleChange}
          onDebouncedChange={handleDebouncedChange}
          onEnter={handleClose}
        />
      </Suspense>
    </Modal>
  )
}
