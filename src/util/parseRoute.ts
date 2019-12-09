import { parse } from 'qs'

type Render = (renderable: {
  params: any
  query: { page: number; per: number }
  originalProps: any
}) => JSX.Element

type Props = {
  location: { search: string }
  match: { params: any }
}

export default (render: Render) => (props: Props) => {
  const _query = parse(props.location.search.slice(1))
  const query = {
    ..._query,
    // Always includes a page/per and coerces them into integers if present
    page: _query.page ? parseInt(_query.page, 10) : 1,
    per: _query.per ? parseInt(_query.per, 10) : 24,
  }

  return render({
    params: props.match.params,
    query,
    originalProps: props,
  })
}
