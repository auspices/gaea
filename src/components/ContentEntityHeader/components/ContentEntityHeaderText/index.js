import React from 'react'

import { Link } from 'components/UI/Link'

export const ContentEntityHeaderText = ({ text }) => {
  return (
    <Link href={`https://www.google.com/search?q=${text.body}`} target="_blank">
      search
    </Link>
  )
}
