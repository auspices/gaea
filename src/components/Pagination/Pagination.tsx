import React from 'react'
import { Link } from 'react-router-dom'
import {
  Page as PAGE,
  PageProps,
  Pagination as PAGINATION,
  PaginationProps,
} from '@auspices/eos'

// TODO: Is there a way to just curry component props?
const Page: React.FC<PageProps> = (props) => <PAGE as={Link} {...props} />

export const Pagination: React.FC<PaginationProps> = (props) => (
  <PAGINATION Page={Page} {...props} />
)
