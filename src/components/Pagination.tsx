import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  PageProps as BasePageProps,
  Button,
  PaginationPage,
  PaginationProps,
  Stack,
} from '@auspices/eos'
import { usePagination } from '../hooks'

export const Pagination: React.FC<
  PaginationProps & { href: string; per: number }
> = ({ total, page, interval, per, href, ...rest }) => {
  const {
    current,
    head,
    leftSurrounding,
    rightSurrounding,
    setTotal,
    tail,
    totalPages,
  } = usePagination()

  useEffect(() => setTotal(total), [setTotal, total])

  if (totalPages <= 1) return null

  return (
    <Stack direction="horizontal" {...rest}>
      <Stack direction="horizontal">
        {head.map((page) => {
          return <Page key={page.page} href={href} per={per} {...page} />
        })}
      </Stack>

      {leftSurrounding.map((page) => {
        return (
          <Page
            key={page.page}
            href={href}
            per={per}
            display={['none', 'none', 'block']}
            {...page}
          />
        )
      })}

      <Page href={href} per={per} {...current} />

      {rightSurrounding.map((page) => {
        return (
          <Page
            key={page.page}
            href={href}
            per={per}
            display={['none', 'none', 'block']}
            {...page}
          />
        )
      })}

      <Stack direction="horizontal">
        {tail.map((page) => {
          return <Page key={page.page} href={href} per={per} {...page} />
        })}
      </Stack>
    </Stack>
  )
}

type PageProps = PaginationPage &
  Omit<BasePageProps, 'onClick' | 'children'> & {
    onClick?(page: number): void
    href: string
    per: number
  }

const Page: FC<PageProps> = ({
  disabled,
  href,
  label,
  onClick,
  page,
  per,
  tabIndex,
  ...rest
}) => {
  const handleClick = () => {
    if (!onClick) return

    onClick(page)
  }

  return (
    <Button
      as={Link}
      key={page}
      flex="1"
      textAlign="center"
      onClick={handleClick}
      disabled={disabled}
      tabIndex={tabIndex}
      to={{
        pathname: href,
        search: `?page=${page}&per=${per}`,
      }}
      {...rest}
    >
      {label}
    </Button>
  )
}
