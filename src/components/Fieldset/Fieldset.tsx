import React, { useCallback, useState } from 'react'
import { Field, Stack, StackProps } from '@auspices/eos'
import { useUpdateEffect } from '../../hooks'

export type FieldsetData = Record<
  string,
  string | number | string[] | undefined
>

export type FieldsetProps = StackProps & {
  data: FieldsetData
  onChange?(data: FieldsetData): void
}

export const Fieldset: React.FC<FieldsetProps> = ({
  data,
  onChange,
  ...rest
}) => {
  const [state, setState] = useState<FieldsetData>(data)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextData = { [event.target.name]: event.target.value }
      setState((prevState) => ({ ...prevState, ...nextData }))
    },
    []
  )

  useUpdateEffect(() => onChange && onChange(state), [onChange, state])

  return (
    <Stack {...rest}>
      {Object.entries(state).map(([key, value]) => (
        <Field
          key={key}
          label={key}
          input={{ name: key, defaultValue: value, onChange: handleChange }}
        />
      ))}
    </Stack>
  )
}
