import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { mixin as boxMixin } from '../Box'

export const mixin = css`
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

export const InternalLink = styled(Link)`
  ${mixin}
`

export const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  ${mixin}
`

export default ({ to, children, ...rest }) => {
  return to ? (
    <InternalLink to={to} {...rest}>
      {children}
    </InternalLink>
  ) : (
    <ExternalLink {...rest}>{children}</ExternalLink>
  )
}
