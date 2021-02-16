import { parse } from 'qs'
import { useLocation } from 'react-router-dom'

export const useQueryString = <T extends Record<string, unknown>>() => {
  const { search } = useLocation()
  return parse(search.slice(1)) as T
}
