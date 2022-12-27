import React, { FC, useEffect } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import {
  Page as BasePage,
  PageProps as BasePageProps,
  PaginationPage,
  PaginationProps,
  Stack,
} from '@auspices/eos'
import { usePagination } from '../hooks'

export const Pagination: React.FC<PaginationProps & { href: string }> = ({
  total,
  page,
  interval,
  per,
  href,
  ...rest
}) => {
  const { head, center, tail, totalPages, setTotal } = usePagination()

  useEffect(() => setTotal(total), [setTotal, total])

  if (totalPages <= 1) return null

  return (
    <Stack direction="horizontal" {...rest}>
      <Stack direction="horizontal">
        {head.map((page) => {
          return <Page key={page.page} to={href} {...page} />
        })}
      </Stack>

      {center.map((page) => {
        return <Page key={page.page} to={href} {...page} />
      })}

      <Stack direction="horizontal">
        {tail.map((page) => {
          return <Page key={page.page} to={href} {...page} />
        })}
      </Stack>
    </Stack>
  )
}

type PageProps = PaginationPage &
  Omit<BasePageProps, 'onClick' | 'children'> & {
    onClick?(page: number): void
    to: LinkProps['to']
  }

const Page: FC<PageProps> = ({
  page,
  label,
  disabled,
  tabIndex,
  onClick,
  ...rest
}) => {
  const handleClick = () => {
    if (!onClick) return

    onClick(page)
  }

  return (
    <BasePage
      as={Link}
      key={page}
      onClick={handleClick}
      disabled={disabled}
      tabIndex={tabIndex}
      {...rest}
    >
      {label}
    </BasePage>
  )
}
