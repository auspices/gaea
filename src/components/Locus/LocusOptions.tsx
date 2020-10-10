import React from 'react'
import { Button, Stack, StackProps } from '@auspices/eos'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
import { LocusLabel } from './LocusLabel'
import styled from 'styled-components'

const Option = styled(Button)`
  u {
    text-decoration: ${({ highlighted }) =>
      highlighted ? 'underline' : 'none'};
  }
`

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
          <Option
            key={i}
            highlighted={index === i}
            onClick={() => onClick(onEnter)}
          >
            <LocusLabel isMutation={kind === Kind.MUTATION}>{label}</LocusLabel>
          </Option>
        )
      })}
    </Stack>
  )
}
