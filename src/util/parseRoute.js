import { parse } from 'qs'

export default renderFn => props => {
  const _query = parse(props.location.search.slice(1))
  const query = {
    ..._query,
    // Always includes a page/per and coerces them into integers if present
    page: _query.page ? parseInt(_query.page, 10) : 1,
    per: _query.per ? parseInt(_query.per, 10) : 24,
  }

  return renderFn({
    params: props.match.params,
    query,
    originalProps: props,
  })
}
