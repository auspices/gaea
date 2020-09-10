import React from 'react'
import { Box } from '@auspices/eos'

type LocusLabelProps = {
  isMutation: boolean
}

export const LocusLabel: React.FC<LocusLabelProps> = ({
  children,
  isMutation,
}) => {
  return isMutation ? (
    <>
      <Box as="span" color="tertiary">
        {'<'}
      </Box>
      {children}
      <Box as="span" color="tertiary">
        {'>'}
      </Box>
    </>
  ) : (
    <>{children}</>
  )
}
