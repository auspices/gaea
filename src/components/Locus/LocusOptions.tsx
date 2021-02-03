import React from 'react'
import { Button, Stack, StackProps } from '@auspices/eos'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
import { LocusLabel } from './LocusLabel'

export enum Kind {
  ACTION,
  MUTATION,
  SEARCH,
}

export type LocusOption = {
  key: string
  label: string | JSX.Element
  kind: Kind
  onClick(done: () => void): void
}

export type LocusOptionsProps = StackProps & {
  options: LocusOption[]
  onEnter(): void
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
      onClick(onEnter)
    },
  })

  return (
    <Stack {...rest}>
      {options.map(({ onClick, label, kind }, i) => {
        return (
          <Button
            key={i}
            highlighted={index === i}
            onClick={() => onClick(onEnter)}
            justifyContent="flex-start"
            textAlign="left"
          >
            <LocusLabel isMutation={kind === Kind.MUTATION}>{label}</LocusLabel>
          </Button>
        )
      })}
    </Stack>
  )
}
