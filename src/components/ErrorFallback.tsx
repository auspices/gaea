import React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Cell, Stack } from '@auspices/eos'
import { errorMessage, GraphQLError } from '../util/errors'
import { useLocation } from 'react-router-dom'
import { useHrefs } from '../hooks'

const isDevelopment = process.env.NODE_ENV === 'development'

export type ErrorFallbackProps = {
  error: Error & { graphQLErrors?: GraphQLError[] }
  componentStack: string
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  componentStack,
  error,
}) => {
  const location = useLocation()
  const hrefs = useHrefs()

  const errorStack = (error.stack || componentStack)
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .join('\n')

  const stackTrace = [
    error.graphQLErrors && JSON.stringify(error.graphQLErrors, null, 2),
    errorStack,
  ]
    .filter(Boolean)
    .join('\n\n')

  const requireLogin = error.graphQLErrors?.some(
    (err) => err.extensions.code === 'UNAUTHORIZED'
  )

  return (
    <>
      <Helmet>
        <title>error</title>
      </Helmet>

      <Stack>
        {error && (
          <Cell as="h1" color="danger" borderColor="danger">
            {errorMessage(error)}
          </Cell>
        )}

        <Cell as="h2" color="danger" borderColor="danger">
          <span>
            could a version perhaps be false somewhat in the way a jigsaw puzzle
            can be wrongly put together, or a motor fail to run, a poster to
            attract attention, or a camouflage to conceal?{' '}
            {requireLogin ? (
              <Box
                as="a"
                color="danger"
                href={hrefs.login(
                  [location.pathname, location.search].join('')
                )}
              >
                login
              </Box>
            ) : (
              <Box as="a" color="danger" href="/">
                go home
              </Box>
            )}
          </span>
        </Cell>

        {isDevelopment && (
          <Cell
            as="pre"
            fontFamily="mono"
            fontSize={0}
            color="white"
            backgroundColor="danger"
            borderColor="danger"
          >
            {stackTrace}
          </Cell>
        )}
      </Stack>
    </>
  )
}
