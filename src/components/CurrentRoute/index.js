import { withRouter } from 'react-router-dom'

import parseRoute from 'util/parseRoute'

export const CurrentRoute = withRouter(({ children, ...rest }) => {
  return children(parseRoute(x => x)(rest))
})
