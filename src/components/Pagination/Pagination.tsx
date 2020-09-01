import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Page as PAGE,
  PageProps,
  Pagination as PAGINATION,
  PaginationProps,
} from '@auspices/eos'
import { usePagination } from '../../hooks'

const Page: React.FC<PageProps> = (props) => <PAGE as={Link} {...props} />

export const Pagination: React.FC<PaginationProps> = ({ total, ...rest }) => {
  const { setTotal } = usePagination()

  useEffect(() => setTotal(total), [setTotal, total])

  return <PAGINATION Page={Page} total={total} {...rest} />
}
