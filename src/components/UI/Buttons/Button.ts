import styled from 'styled-components'

import { mixin as boxMixin, Props as BoxProps } from '../Box'

export type Props = React.HTMLAttributes<HTMLButtonElement> & BoxProps

export const Button = styled.button<Props>`
  appearance: none;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  background-color: transparent;

  ${boxMixin}

  ${props =>
    props.disabled &&
    `
    cursor: default;
    pointer-events: none;
    opacity: 0.75;
  `}

  &:hover {
    text-decoration: underline;
  }
`
