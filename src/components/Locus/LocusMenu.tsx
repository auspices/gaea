import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ClearableInput, Stack, StackProps } from '@auspices/eos'
import { useDebounce } from 'use-debounce'
import { Kind, LocusOption, LocusOptions } from './LocusOptions'
import Fuse from 'fuse.js'

export type LocusMenuProps = StackProps & {
  options: LocusOption[]
  onChange?(query: string): void
  onDebouncedChange?(debouncedQuery: string): void
  onEnter(): void
}

export const LocusMenu: React.FC<LocusMenuProps> = ({
  options,
  onChange,
  onDebouncedChange,
  onEnter,
  ...rest
}) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 150)

  const actions = options.filter((option) => option.kind === Kind.ACTION)
  const topResult = options.find((option) => option.kind === Kind.SEARCH)
  const results = options.filter(
    (option) => option.kind !== Kind.ACTION && option.label !== topResult?.label
  )

  const fuse = useMemo(() => {
    return new Fuse(actions, {
      keys: ['key'],
      isCaseSensitive: false,
      includeScore: true,
    })
  }, [actions])

  const filteredActions = useMemo(() => {
    return fuse.search(query).map(({ item }) => item)
  }, [fuse, query])

  useEffect(() => onChange && onChange(query), [query, onChange])
  useEffect(
    () => onDebouncedChange && onDebouncedChange(debouncedQuery),
    [debouncedQuery, onDebouncedChange]
  )

  useEffect(() => {
    if (!ref.current) return
    // Lazy loading creates a disconnect between the click
    // and the default autofocus. Manually focus on mount.
    ref.current.focus()
  }, [])

  return (
    <Stack width={['75vw', '75vw', '50vw']} bg="background" {...rest}>
      <ClearableInput
        ref={ref}
        placeholder="type a command, search..."
        onChange={setQuery}
      />

      {options.length > 0 && (
        <LocusOptions
          options={
            query !== ''
              ? [topResult!, ...filteredActions, ...results].filter(Boolean)
              : options
          }
          onEnter={onEnter}
        />
      )}
    </Stack>
  )
}

export default LocusMenu
