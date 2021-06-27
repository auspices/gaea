import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Helmet } from 'react-helmet'
import { Box, Button, Input, Stack, useAlerts } from '@auspices/eos'
import { useHrefs } from '../hooks'
import { errorMessage } from '../util/errors'
import {
  RegisterPageMutation,
  RegisterPageMutationVariables,
} from '../generated/types/RegisterPageMutation'
import { AUTOFOCUS } from '../util/autoFocus'

const REGISTER_PAGE_MUTATION = gql`
  mutation RegisterPageMutation(
    $secret: String!
    $username: String!
    $password: String!
    $passwordConfirmation: String!
    $email: String!
  ) {
    register(
      input: {
        secret: $secret
        username: $username
        password: $password
        passwordConfirmation: $passwordConfirmation
        email: $email
      }
    ) {
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

export const RegisterPage: React.FC = () => {
  const history = useHistory()

  const hrefs = useHrefs()

  const [mode, setMode] = useState(Mode.Resting)

  const [register] = useMutation<
    RegisterPageMutation,
    RegisterPageMutationVariables
  >(REGISTER_PAGE_MUTATION)

  const { sendError, sendNotification } = useAlerts()
  const [state, setState] = useState<{
    secret: string
    username: string
    password: string
    passwordConfirmation: string
    email: string
  }>({
    secret: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    email: '',
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
      sendNotification({ body: 'creating account' })
      setMode(Mode.Loading)
      try {
        const { data } = await register({ variables: state })
        const { jwt } = data!.register!
        localStorage.setItem('jwt', jwt)
        sendNotification({ body: 'successfully created account' })
        history.push(hrefs.collections())
      } catch (err) {
        sendError({ body: errorMessage(err) })
      }
      setMode(Mode.Resting)
    },
    [history, hrefs, register, sendError, sendNotification, state]
  )

  return (
    <>
      <Helmet>
        <title>register</title>
      </Helmet>

      <Box
        as="form"
        width="100%"
        // @ts-ignore
        onSubmit={handleSubmit}
      >
        <Stack>
          <Input
            flex="1"
            placeholder="secret code"
            name="secret"
            onChange={handleChange}
            required
            autoFocus={AUTOFOCUS}
            autoCorrect="off"
            autoCapitalize="none"
          />

          <Stack direction={['vertical', 'vertical', 'horizontal']}>
            <Input
              flex="1"
              name="username"
              placeholder="username"
              onChange={handleChange}
              required
              autoCorrect="off"
              autoCapitalize="none"
            />

            <Input
              flex="1"
              name="email"
              placeholder="email"
              type="email"
              onChange={handleChange}
              required
              autoCorrect="off"
              autoCapitalize="none"
            />
          </Stack>

          <Stack direction={['vertical', 'vertical', 'horizontal']}>
            <Input
              flex="1"
              name="password"
              placeholder="password"
              type="password"
              onChange={handleChange}
              required
            />

            <Input
              flex="1"
              name="passwordConfirmation"
              placeholder="confirm password"
              type="password"
              onChange={handleChange}
              required
            />

            <Button type="submit" flex="1" disabled={mode === Mode.Loading}>
              register
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
