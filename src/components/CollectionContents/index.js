import React, { useCallback, useState } from 'react'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { graphql } from 'react-apollo'

import { reorder } from '../../util/reorder'

import { repositionCollectionContentMutation } from './mutations/repositionCollectionContent'

import { WithAlerts } from '../../components/Alerts'
import Grid from '../../components/UI/Grid'
import CollectionContent from '../../components/CollectionContent'

const SortableGrid = sortableContainer(({ onSortEnd: _onSortEnd, ...rest }) => (
  <Grid {...rest} />
))

const SortableContent = sortableElement(CollectionContent)

export const CollectionContents = WithAlerts(
  graphql(repositionCollectionContentMutation, {
    name: 'repositionCollectionContent',
  })(
    ({
      collection,
      hrefs,
      page,
      per,
      repositionCollectionContent,
      dispatchError,
    }) => {
      const offset = (page - 1) * per

      const [contents, setContents] = useState(collection.contents)

      // Calculates set-difference to see if collection has been updated
      // (additions/removals) since last render
      if (
        contents.length !== collection.contents.length ||
        contents.filter(x => !collection.contents.includes(x)).length
      ) {
        setContents(collection.contents)
      }

      const handleSortEnd = useCallback(
        ({ oldIndex, newIndex }) => {
          const sortedContents = reorder({
            list: contents,
            startIndex: oldIndex,
            endIndex: newIndex,
            offset,
          })

          setContents(sortedContents)

          const content = contents[oldIndex - offset]

          repositionCollectionContent({
            variables: {
              contentId: content.id,
              action: 'INSERT_AT',
              insertAt: newIndex,
            },
          }).catch(dispatchError)
        },
        [contents, offset, repositionCollectionContent, dispatchError]
      )

      return (
        <SortableGrid
          my={6}
          transitionDuration={0}
          distance={1}
          useWindowAsScrollContainer
          axis="xy"
          onSortEnd={handleSortEnd}
        >
          {contents.map((content, index) => (
            <SortableContent
              key={content.id}
              index={index + offset}
              collectionId={collection.id}
              content={content}
              hrefs={hrefs}
              page={page}
              per={per}
              mr={6}
              my={6}
            />
          ))}
        </SortableGrid>
      )
    }
  )
)
