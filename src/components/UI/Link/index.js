import React from 'react'
import styled, { css } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

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
    ${props =>
      ({
        UNDERLINE: 'text-decoration: underline;',
        OPACITY: 'opacity: 0.5;',
        NONE: '',
      }[props.hoverStyle])}
  }
`

export const InternalLink = styled(({ hoverStyle: _hoverStyle, ...rest }) => (
  <RouterLink {...rest} />
))`
  ${mixin}
`

export const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  ${mixin}
`

export const Link = ({ to, children, hoverStyle = 'UNDERLINE', ...rest }) => {
  return to ? (
    <InternalLink to={to} hoverStyle={hoverStyle} {...rest}>
      {children}
    </InternalLink>
  ) : (
    <ExternalLink hoverStyle={hoverStyle} {...rest}>
      {children}
    </ExternalLink>
  )
}

export default Link
