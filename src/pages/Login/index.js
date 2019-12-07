import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router'
import styled from 'styled-components'

import loginMutation from './mutations/login'

import * as hrefs from 'util/hrefs'

import { Button } from 'components/UI/Buttons'
import { TextInput } from 'components/UI/Inputs'
import { WithAlerts } from 'components/Alerts'

const Form = styled.form`
  display: flex;
  width: 100%;
  justify-content: stretch;

  > * {
    flex: 1;
    border: 1px solid black;
    margin-left: -1px;
    padding: ${({ theme: { space } }) => `${space[5]} ${space[6]}`};

    &:first-child {
      margin-left: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-wrap: wrap;
    > * {
      flex-basis: 100%;
      margin-top: -1px;

      &,
      &:first-child,
      &:last-child {
        margin-left: 0;
        border-radius: 0;
      }

      &:first-child {
        margin-top: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
`

class Login extends PureComponent {
  state = {
    mode: 'resting',
    username: null,
    password: null,
    errorMessage: null,
    userSlug: null,
  }

  handleInput = name => ({ target: { value } }) =>
    this.setState({
      mode: 'active',
      errorMessage: null,
      [name]: value,
    })

  handleUsername = this.handleInput('username')
  handlePassword = this.handleInput('password')

  handleLogin = e => {
    e.preventDefault()

    const { login, dispatchAlert, dispatchError } = this.props
    const { username, password } = this.state

    login({ variables: { username, password } })
      .then(
        ({
          data: {
            login: { jwt, user },
          },
        }) => {
          localStorage.setItem('jwt', jwt)

          dispatchAlert('Logged in')

          this.setState({ mode: 'success', userSlug: user.slug })
        }
      )
      .catch(err => {
        dispatchError(err)

        console.error(err)
      })
  }

  render() {
    const { mode, userSlug } = this.state

    if (mode === 'success') {
      return <Redirect to={hrefs.collections({ slug: userSlug })} />
    }

    return (
      <Form>
        <TextInput
          placeholder="username"
          onChange={this.handleUsername}
          required
          autoFocus
        />

        <TextInput
          placeholder="password"
          type="password"
          onChange={this.handlePassword}
          required
        />

        <Button onClick={this.handleLogin}>login</Button>
      </Form>
    )
  }
}

export default graphql(loginMutation, {
  name: 'login',
})(WithAlerts(Login))
