import { parse, stringify } from 'qs'
import { useLocation } from 'react-router'

const encode = ({
  page,
  per,
}: {
  page: number | string
  per: number | string
}) => `?${stringify({ page, per })}`

export const usePagination = () => {
  const { search } = useLocation()
  const { page = '1', per = '24' } = parse(search.slice(1))

  return {
    page: parseInt(page, 10),
    per: parseInt(per, 10),
    encode,
  }
}
