import { parse, stringify } from 'qs'
import { useLocation, useParams } from 'react-router'
import { THEME } from '@auspices/eos'

const encode = ({
  page,
  per,
}: {
  page: number | string
  per: number | string
}) => `?${stringify({ page, per })}`

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
  const { search } = useLocation()
  const params = useParams()
  const mode = 'id' in params ? 'grid' : 'list'

  let { page = '1', per = '' } = parse(search.slice(1))

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

  return {
    page: parseInt(page, 10),
    per: parseInt(per, 10),
    encode,
  }
}
