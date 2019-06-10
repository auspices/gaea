import React from 'react'

import { Box } from 'components/UI/Box'

export const ContentEntityText = ({ text, ...rest }) => {
  return <Box {...rest}>{text.body}</Box>
}
