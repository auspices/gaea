import React, { Children } from 'react'
import styled from 'styled-components'

import Box from '../UI/Box'

const Container = styled(Box).attrs({
  borderRadius: 4,
})`
  display: flex;
  align-items: stretch;
  border: 1px solid black;
  overflow: hidden;
`

const Crumb = styled(Box)`
  border-left: 1px solid black;

  &:first-child {
    border-left: 0;
  }

  > a,
  > span,
  > div {
    display: block;
    padding: ${({ theme: { space } }) => `${space[5]} ${space[6]}`};
  }

  ${props =>
    props.children.key === 'input' &&
    `
    flex: 1;
    padding: 0;

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

const Header = ({ children, isLoading, ...rest }) => (
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

Header.defaultProps = {
  isLoading: false,
}

export default Header
