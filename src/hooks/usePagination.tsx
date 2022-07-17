import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { stringify } from 'qs'
import { matchPath, useLocation } from 'react-router'
import { paginate, THEME } from '@auspices/eos'
import { useQueryString } from './useQueryString'

const PaginationContext = React.createContext<{
  total: number
  setTotal: Dispatch<SetStateAction<number>>
}>({ total: 0, setTotal: () => {} })

type PaginationProviderProps = {
  children: React.ReactNode
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  const [total, setTotal] = useState(0)

  return (
    <PaginationContext.Provider value={{ total, setTotal }}>
      {children}
    </PaginationContext.Provider>
  )
}

type Pagination = {
  page: number | string
  per: number | string
}

const encode = ({ page, per }: Pagination) => `?${stringify({ page, per })}`

const ROOT_FONT_SIZE = 16.0
const CELL_WIDTH = parseFloat(THEME.space[10]) * ROOT_FONT_SIZE
const GAP_WIDTH = parseFloat(THEME.space[5]) * ROOT_FONT_SIZE
const OUTER_MARGIN = parseFloat(THEME.space[4]) * ROOT_FONT_SIZE

const PER_ROW: { [key: string]: number } = [3, 4, 5, 6, 7, 8, 9].reduce(
  (acc, n) => ({
    ...acc,
    [CELL_WIDTH * n + GAP_WIDTH * (n - 1) + OUTER_MARGIN * 2]: n,
  }),
  {}
)

const WIDTHS = Object.keys(PER_ROW)
  .map((n) => parseInt(n, 10))
  .sort((a, b) => a - b)

const DEFAULT_ROWS = 3
const DEFAULT_GRID_PER = 12
const DEFAULT_LIST_PER = 24

export const usePagination = () => {
  const { pathname } = useLocation()
  const { total, setTotal } = useContext(PaginationContext)

  const mode = matchPath({ path: '/xs' }, pathname) ? 'list' : 'grid'

  let { page = '1', per = '' } = useQueryString<Pagination>()

  if (per === '' && mode === 'grid') {
    const key = WIDTHS.find((currentWidth, i) => {
      const nextWidth = WIDTHS[i + 1] || Infinity
      return window.innerWidth >= currentWidth && window.innerWidth < nextWidth
    })

    per = key ? PER_ROW[`${key}`] * DEFAULT_ROWS : DEFAULT_GRID_PER
  }

  if (per === '' && mode === 'list') {
    per = DEFAULT_LIST_PER
  }

  page = parseInt(String(page), 10)
  per = parseInt(String(per), 10)

  const { totalPages, nextPage, prevPage } = paginate({
    page,
    per,
    total,
  })

  return {
    page,
    per,
    total,
    totalPages,
    nextPage,
    prevPage,
    encode,
    setTotal,
  }
}
