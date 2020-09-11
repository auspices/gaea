import React from 'react'
import { Box, Spinner } from '@auspices/eos'

export const LocusBusy = () => {
  return (
    <Box display="flex" height="100vh" alignItems="center">
      <Spinner />
    </Box>
  )
}
