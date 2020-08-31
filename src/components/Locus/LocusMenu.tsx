import React, { useEffect, useRef, useState } from 'react'
import { ClearableInput, Stack } from '@auspices/eos'
import { useDebounce } from 'use-debounce/lib'
import { LocusOption, LocusOptions } from './LocusOptions'

export type LocusMenuProps = {
  options: LocusOption[]
  waitForInteractive?: boolean
  onChange(query: string): void
  onEnter?(): void
}

export const LocusMenu: React.FC<LocusMenuProps> = ({
  options,
  waitForInteractive,
  onChange,
  onEnter,
}) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 150)

  useEffect(() => {
    onChange(debouncedQuery)
  }, [debouncedQuery, onChange])

  return (
    <Stack width="50vw" bg="background">
      <ClearableInput
        ref={ref}
        placeholder="type a command, search..."
        onChange={setQuery}
      />

      {options.length > 0 && (
        <LocusOptions
          options={options}
          waitForInteractive={waitForInteractive}
          onEnter={onEnter}
        />
      )}
    </Stack>
  )
}
