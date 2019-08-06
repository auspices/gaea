import React, { Children } from 'react'
import styled from 'styled-components'

import { Box } from 'components/UI/Box'

const Container = styled(Box).attrs({
  borderRadius: 4,
})`
  display: flex;
  align-items: stretch;
  border: 1px solid black;
  overflow: hidden;
`

export const Crumb = styled(Box)`
  display: flex;

  > a,
  > span,
  > div {
    display: block;
    padding: ${({ theme: { space } }) => `${space[5]} ${space[6]}`};
    border-left: 1px solid black;
  }

  &:first-child {
    > a,
    > span,
    > div {
      border-left: 0;
    }
  }

  ${props =>
    props.children.key === 'primary' &&
    `
    flex: 1;
  `}

  ${props =>
    props.children.key === 'input' &&
    `
    flex: 1;
    padding: 0;
    border-left: 1px solid black;

    form,
    input {
      width: 100%;
      height: 100%;
    }

    input {
      border: 0;
    }
  `}
`

export const Header = ({ children, isLoading = false, ...rest }) => (
  <Container {...rest}>
    {isLoading ? (
      <Crumb>
        <span>&nbsp;</span>
      </Crumb>
    ) : (
      Children.map(children, child => <Crumb>{child}</Crumb>)
    )}
  </Container>
)

export default Header
