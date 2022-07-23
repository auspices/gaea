import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { Modal } from '@auspices/eos'
import { useMatch, useNavigate } from 'react-router'
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
  EntityTypes,
  LocusCollectionsQuery,
  LocusCollectionsQueryVariables,
} from '../../generated/graphql'
import { useLocusToggle } from './useLocusToggle'
import { LocusBusy } from './LocusBusy'
import { Status, useLocus, Visibility } from './LocusContext'

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
  const { status, visibility, dispatch } = useLocus()

  const navigate = useNavigate()
  const { page, per, nextPage, prevPage, encode } = usePagination()

  const { handleClose } = useLocusToggle()

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
            navigate({ search: encode({ page: nextPage, per }) })
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
            navigate({ search: encode({ page: prevPage, per }) })
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
        navigate(-1)
        done()
      },
    }),
    ...addCommand(!matches.collections, {
      key: 'home',
      label: 'go home',
      kind: Kind.ACTION,
      onClick: (done) => {
        navigate(hrefs.root())
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
            dispatch({ type: 'STATUS', payload: Status.Busy })
            createAndAddCollectionToCollection(query).then(() => {
              dispatch({ type: 'STATUS', payload: Status.Resting })
              done()
            })
          },
        }),
      ])
    },
    [createAndAddCollectionToCollection, dispatch, matches.collection]
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
              dispatch({ type: 'STATUS', payload: Status.Busy })
              addEntityToCollection(
                matches.collection!.params.id!,
                slug,
                EntityTypes.Collection
              ).then(() => {
                dispatch({ type: 'STATUS', payload: Status.Resting })
                done()
              })
            },
          }),

          // Add current collection to the specified collection
          ...addCommand((i === 0 || i === 1) && !!matches.collection, {
            key: title,
            label: (
              <>
                add this to <u>{title}</u>
              </>
            ),
            kind: Kind.MUTATION,
            onClick: (done) => {
              dispatch({ type: 'STATUS', payload: Status.Busy })
              addEntityToCollection(
                slug,
                matches.collection!.params.id!,
                EntityTypes.Collection
              ).then(() => {
                dispatch({ type: 'STATUS', payload: Status.Resting })
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
              dispatch({ type: 'STATUS', payload: Status.Busy })
              addEntityFromContentToCollection(
                slug,
                matches.content!.params.id!
              ).then(() => {
                dispatch({ type: 'STATUS', payload: Status.Resting })
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
              navigate(hrefs.collection(slug))
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
    dispatch,
    error,
    loading,
    matches.collection,
    matches.content,
    navigate,
  ])

  if (visibility === Visibility.Resting) return null

  return (
    <Modal
      overlay
      zIndex={Z.MODAL}
      alignItems="flex-start"
      onClose={handleClose}
    >
      <Suspense fallback={<LocusBusy />}>
        {status === Status.Resting ? (
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
