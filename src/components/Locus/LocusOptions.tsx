import React from 'react'
import { Button, Stack, StackProps } from '@auspices/eos'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'

export type LocusOption = { key: string; label: string; onClick?(): void }

export type LocusOptionsProps = StackProps & {
  options: LocusOption[]
  onEnter?(): void
}

export const LocusOptions: React.FC<LocusOptionsProps> = ({
  options,
  onEnter,
  ...rest
}) => {
  const { index } = useKeyboardListNavigation({
    list: options,
    waitForInteractive: false,
    onEnter: ({ element: { onClick } }) => {
      onClick && onClick()
      onEnter && onEnter()
    },
  })

  return (
    <Stack {...rest}>
      {options.map(({ onClick, label }, i) => {
        return (
          <Button key={i} highlighted={index === i} onClick={onClick}>
            {label}
          </Button>
        )
      })}
    </Stack>
  )
}
