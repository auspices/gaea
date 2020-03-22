import React from 'react'
import { Pill, PillProps } from '@auspices/eos'

export type LoadingProps = PillProps

export const Loading: React.FC<LoadingProps> = (props) => (
  <Pill {...props}>wait</Pill>
)
