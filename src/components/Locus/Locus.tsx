import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { Modal } from '@auspices/eos'
import { useHistory } from 'react-router'
import { gql } from 'graphql-tag'
import { useLazyQuery } from '@apollo/client'
import {
  useAddEntityToCollection,
  useCreateAndAddCollection,
  useMatchesPath,
  usePagination,
} from '../../hooks'
import * as hrefs from '../../hooks/useHrefs'
import { Z } from '../../util/zIndexes'
import { Kind, LocusOption } from './LocusOptions'
import {
  LocusCollectionsQuery,
  LocusCollectionsQueryVariables,
} from '../../generated/types/LocusCollectionsQuery'
import { Mode as Toggle, useLocusToggle } from './useLocusToggle'
import { LocusBusy } from './LocusBusy'
import { EntityTypes } from '../../generated/types/globalTypes'

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
  const { addEntityFromContentToCollection, addEntityToCollection } =
    useAddEntityToCollection()

  const defaultOptions: LocusOption[] = [
    ...addCommand(
      nextPage !== page && (!!matches.collection || !!matches.collections),
      [
        {
          key: 'next',
          label: `go to next page`,
          kind: Kind.ACTION,
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
          kind: Kind.ACTION,
          onClick: (done) => {
            history.push({ search: encode({ page: prevPage, per }) })
            done()
          },
        },
      ]
    ),
    ...addCommand(!!matches.content, {
      key: 'back',
      label: 'go back',
      kind: Kind.ACTION,
      onClick: (done) => {
        history.goBack()
        done()
      },
    }),
    ...addCommand(!matches.collections, {
      key: 'home',
      label: 'go home',
      kind: Kind.ACTION,
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
        setDynamicOptions([])
        return
      }

      setDynamicOptions([
        ...addCommand(!!matches.collection, {
          key: query,
          label: (
            <>
              create and add <u>{query}</u> to the current collection
            </>
          ),
          kind: Kind.MUTATION,
          onClick: (done) => {
            setMode(Mode.Busy)
            createAndAddCollectionToCollection(query).then(() => {
              setMode(Mode.Resting)
              done()
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
      collections.flatMap(({ title, slug }, i) => {
        return [
          // Add collection to collection
          ...addCommand((i === 0 || i === 1) && !!matches.collection, {
            key: title,
            label: (
              <>
                add <u>{title}</u> to the current collection
              </>
            ),
            kind: Kind.MUTATION,
            onClick: (done) => {
              setMode(Mode.Busy)
              addEntityToCollection(
                matches.collection!.params.id,
                slug,
                EntityTypes.COLLECTION
              ).then(() => {
                setMode(Mode.Resting)
                done()
              })
            },
          }),

          // Add entity to collection
          ...addCommand((i === 0 || i === 1) && !!matches.content, {
            key: title,
            label: (
              <>
                add this to <u>{title}</u>
              </>
            ),
            kind: Kind.MUTATION,
            onClick: (done) => {
              setMode(Mode.Busy)
              addEntityFromContentToCollection(
                slug,
                matches.content!.params.id
              ).then(() => {
                setMode(Mode.Resting)
                done()
              })
            },
          }),

          {
            key: title,
            label: (
              <>
                go to&nbsp;<u>{title}</u>
              </>
            ),
            kind: Kind.SEARCH,
            onClick: (done) => {
              history.push(hrefs.collection(slug))
              done()
            },
          },
        ]
      })
    )
  }, [
    addEntityFromContentToCollection,
    addEntityToCollection,
    data,
    error,
    history,
    loading,
    matches.collection,
    matches.content,
  ])

  if (toggle === Toggle.Resting) return null

  return (
    <Modal
      overlay
      zIndex={Z.MODAL}
      alignItems="flex-start"
      onClose={handleClose}
    >
      <Suspense fallback={<LocusBusy />}>
        {mode === Mode.Resting ? (
          <LocusMenu
            mt="25vh"
            options={[...defaultOptions, ...dynamicOptions, ...searchResults]}
            onChange={handleChange}
            onDebouncedChange={handleDebouncedChange}
            onEnter={handleClose}
          />
        ) : (
          <LocusBusy />
        )}
      </Suspense>
    </Modal>
  )
}
