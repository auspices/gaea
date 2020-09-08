import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { Modal, Spinner } from '@auspices/eos'
import { useHistory } from 'react-router'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/client'
import {
  useCreateAndAddCollection,
  useMatchesPath,
  usePagination,
} from '../../hooks'
import * as hrefs from '../../hooks/useHrefs'
import { Z } from '../../util/zIndexes'
import { LocusOption } from './LocusOptions'
import {
  LocusCollectionsQuery,
  LocusCollectionsQueryVariables,
} from '../../generated/types/LocusCollectionsQuery'
import { Mode as Toggle, useLocusToggle } from './useLocusToggle'

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

enum Mode {
  Resting,
  Busy,
}

export const Locus: React.FC = () => {
  const history = useHistory()

  const { page, per, nextPage, prevPage, encode } = usePagination()

  const [mode, setMode] = useState(Mode.Resting)
  const { mode: toggle, handleClose } = useLocusToggle()

  const [getCollections, { loading, data, error }] = useLazyQuery<
    LocusCollectionsQuery,
    LocusCollectionsQueryVariables
  >(LOCUS_COLLECTIONS_QUERY)

  const { matches } = useMatchesPath()

  const { createAndAddCollectionToCollection } = useCreateAndAddCollection()

  const defaultOptions: LocusOption[] = [
    ...addCommand(
      nextPage !== page && (!!matches.collection || !!matches.collections),
      [
        {
          key: 'next',
          label: `go to next page`,
          onClick: (done) => {
            history.push({ search: encode({ page: nextPage, per }) })
            done()
          },
        },
      ]
    ),
    ...addCommand(
      prevPage !== page && (!!matches.collection || !!matches.collections),
      [
        {
          key: 'previous',
          label: `go to previous page`,
          onClick: (done) => {
            history.push({ search: encode({ page: prevPage, per }) })
            done()
          },
        },
      ]
    ),
    ...addCommand(!matches.collections, {
      key: 'home',
      label: 'go home',
      onClick: (done) => {
        history.push(hrefs.root())
        done()
      },
    }),
  ]

  const [searchResults, setSearchResults] = useState<LocusOption[]>([])
  const [dynamicOptions, setDynamicOptions] = useState<LocusOption[]>([])

  const handleChange = useCallback(
    (query: string) => {
      if (query === '') {
        setSearchResults([])
        return
      }

      setDynamicOptions([
        ...addCommand(!!matches.collection, {
          key: query,
          label: `create and add ${query}`,
          onClick: (done) => {
            setMode(Mode.Busy)
            createAndAddCollectionToCollection(query).then(() => {
              setMode(Mode.Resting)
              done()
              // TODO: Debug refetch
              window.location.reload()
            })
          },
        }),
      ])
    },
    [createAndAddCollectionToCollection, matches.collection]
  )

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

    setSearchResults(
      collections.map(({ title, slug }) => {
        return {
          key: title,
          label: `go to ${title}`,
          onClick: (done) => {
            history.push(hrefs.collection(slug))
            done()
          },
        }
      })
    )
  }, [data, error, history, loading])

  if (toggle === Toggle.Resting) return null

  return (
    <Modal overlay zIndex={Z.MODAL} onClose={handleClose}>
      <Suspense fallback={<Spinner />}>
        {mode === Mode.Resting ? (
          <LocusMenu
            options={[...defaultOptions, ...dynamicOptions, ...searchResults]}
            onChange={handleChange}
            onDebouncedChange={handleDebouncedChange}
            onEnter={handleClose}
          />
        ) : (
          <Spinner />
        )}
      </Suspense>
    </Modal>
  )
}
