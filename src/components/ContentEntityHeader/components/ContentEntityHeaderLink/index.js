import React from 'react'

import { Link } from '../../../../components/UI/Link'

export const ContentEntityHeaderLink = ({ link }) => {
  return (
    <Link href={link.url} target="_blank">
      {link.name}
    </Link>
  )
}
