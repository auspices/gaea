import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Helmet } from 'react-helmet'
import { Box, Button, Input, Stack, useAlerts } from '@auspices/eos'
import { useHrefs } from '../hooks'
import { errorMessage } from '../util/errors'
import {
  LoginPageMutation,
  LoginPageMutationVariables,
} from '../generated/types/LoginPageMutation'
import { parse } from 'qs'
import { AUTOFOCUS } from '../util/autoFocus'

const LOGIN_PAGE_MUTATION = gql`
  mutation LoginPageMutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      jwt
      user {
        id
        slug
      }
    }
  }
`

enum Mode {
  Resting,
  Loading,
}

export const LoginPage: React.FC = () => {
  const history = useHistory()
  const hrefs = useHrefs()

  const [mode, setMode] = useState(Mode.Resting)

  const [login] = useMutation<LoginPageMutation, LoginPageMutationVariables>(
    LOGIN_PAGE_MUTATION
  )

  const { sendError, sendNotification } = useAlerts()
  const [state, setState] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  })

  const handleChange = useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, [name]: value }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      sendNotification({ body: 'logging in' })
      setMode(Mode.Loading)
      try {
        const { data } = await login({ variables: state })
        const { jwt } = data!.login!

        localStorage.setItem('jwt', jwt)

        sendNotification({ body: 'successfully logged in' })

        const { redirectTo } = parse(history.location.search.slice(1))
        history.push(redirectTo ? String(redirectTo) : hrefs.collections())
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }
      setMode(Mode.Resting)
    },
    [history, hrefs, login, sendError, sendNotification, state]
  )

  return (
    <>
      <Helmet>
        <title>login</title>
      </Helmet>

      <Box as="form" width="100%" onSubmit={handleSubmit}>
        <Stack direction={['vertical', 'vertical', 'horizontal']}>
          <Input
            flex="1"
            name="username"
            placeholder="username"
            onChange={handleChange}
            required
            autoFocus={AUTOFOCUS}
            autoCorrect="off"
            autoCapitalize="none"
          />

          <Input
            flex="1"
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
            required
          />

          <Button type="submit" flex="1" disabled={mode === Mode.Loading}>
            login
          </Button>
        </Stack>
      </Box>
    </>
  )
}