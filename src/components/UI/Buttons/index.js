import styled from 'styled-components'

import { mixin as boxMixin } from '../Box'

export const Button = styled.button`
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

export const BorderedButton = styled(Button)``

BorderedButton.defaultProps = {
  ...Button.defaultProps,
  py: 5,
  px: 6,
  border: '1px solid',
  borderColor: 'black',
  borderRadius: 4,
}
