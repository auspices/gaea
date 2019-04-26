import styled from 'styled-components'
import { Link as _Link } from 'react-router-dom'

import { mixin as boxMixin } from '../Box'

const Link = styled(_Link)`
  ${boxMixin}

  ${props =>
    props.disabled &&
    `
    cursor: default;
    pointer-events: none;
  `}

  &:hover {
    text-decoration: underline;
  }
`

export default Link
