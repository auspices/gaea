/* eslint-disable react/jsx-no-target-blank */
import React from 'react'

import { Box } from 'components/UI/Box'

export const ContentEntityLink = ({ link, ...rest }) => {
  return (
    <Box {...rest}>
      <a href={link.url} target="_blank">
        {link.url}
      </a>
    </Box>
  )
}
