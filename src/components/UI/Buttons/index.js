import styled from 'styled-components';

import { mixin as boxMixin } from '../Box';

export const Button = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;

  ${boxMixin}

  ${props => props.disabled && `
    cursor: default;
    pointer-events: none;
  `}

  &:hover {
    text-decoration: underline;
  }
`;
