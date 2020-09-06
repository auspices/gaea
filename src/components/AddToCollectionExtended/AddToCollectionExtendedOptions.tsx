import React, { useCallback, useMemo } from 'react'
import { Button, Stack, StackProps } from '@auspices/eos'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
import { useContextualRef, useCreateAndAddCollection } from '../../hooks'

export type AddToCollectionExtendedOption = {
  label: string
  onClick(): void
}

export type AddToCollectionExtendedOptionsProps = StackProps & {
  value: string
  collections: { id: number; name: string }[]
  onDone(): void
}

export const AddToCollectionExtendedOptions: React.FC<AddToCollectionExtendedOptionsProps> = ({
  value,
  collections,
  onDone,
  ...rest
}) => {
  const {
    addCollectionToCollection,
    createAndAddCollectionToCollection,
  } = useCreateAndAddCollection()

  const { getContextualRef } = useContextualRef()
  const inputRef = getContextualRef('collectionInput')

  const list: AddToCollectionExtendedOption[] = useMemo(
    () => [
      ...collections.map(({ id: childId, name: childName }) => ({
        label: `add ${childName}`,
        onClick: () =>
          addCollectionToCollection(childId, childName).then(() => onDone()),
      })),
      {
        label: `create and add collection “${value}”`,
        onClick: () =>
          createAndAddCollectionToCollection(value).then(() => onDone()),
      },
    ],
    [
      addCollectionToCollection,
      collections,
      createAndAddCollectionToCollection,
      onDone,
      value,
    ]
  )

  const handleEnter = useCallback(
    ({
      event,
      element: option,
    }: {
      event: KeyboardEvent
      element: AddToCollectionExtendedOption
    }) => {
      event.preventDefault()
      option.onClick()
    },
    []
  )

  const { index } = useKeyboardListNavigation({
    ref: inputRef,
    list,
    waitForInteractive: true,
    onEnter: handleEnter,
  })

  return (
    <Stack {...rest}>
      {list.map((option, i) => (
        <Button key={i} highlighted={index === i} onClick={option.onClick}>
          {option.label}
        </Button>
      ))}
    </Stack>
  )
}
