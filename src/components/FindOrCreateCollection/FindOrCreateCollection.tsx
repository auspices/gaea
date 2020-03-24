import React from 'react'
import { Box, Pill } from '@auspices/eos'
import { CreateCollection } from '../CreateCollection'

export type FindOrCreateCollectionProps = {}

export const FindOrCreateCollection: React.FC<FindOrCreateCollectionProps> = ({
  ...rest
}) => {
  return (
    <Box position="relative" flex="1" {...rest}>
      <CreateCollection />
      <Pill
        position="absolute"
        top="100%"
        left={0}
        right={0}
        marginTop={'-1px'}
        bg="background"
        zIndex={1}
      >
        TODO: Remove this
      </Pill>
    </Box>
  )
}
