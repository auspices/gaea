import React from 'react'
import { Box } from '@auspices/eos'

type LocusLabelProps = {
  isMutation: boolean
  children: React.ReactNode
}

export const LocusLabel: React.FC<LocusLabelProps> = ({
  children,
  isMutation,
}) => {
  return isMutation ? (
    <Box color="accent">
      {'<'}
      {children}
      {'>'}
    </Box>
  ) : (
    <>{children}</>
  )
}
