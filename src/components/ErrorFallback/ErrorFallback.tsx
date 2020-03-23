import React from 'react'
import { Box, Pill, Stack } from '@auspices/eos'
import { errorMessage, GraphQLError } from '../../util/errors'

const isDevelopment = process.env.NODE_ENV === 'development'

export type ErrorFallbackProps = {
  error: Error & { graphQLErrors: GraphQLError[] }
  componentStack: string
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  componentStack,
  error,
}) => {
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

  const requireLogin = error.graphQLErrors.some(
    (err) => err.extensions.code === 'UNAUTHORIZED'
  )

  return (
    <Stack>
      {error && (
        <Pill as="h1" color="danger" borderColor="danger">
          {errorMessage(error)}

          {requireLogin && (
            <>
              &nbsp;
              <Box as="a" color="danger" href="/login">
                login
              </Box>
            </>
          )}
        </Pill>
      )}

      <Pill as="h2" color="danger" borderColor="danger">
        <span>
          could a version perhaps be false somewhat in the way a jigsaw puzzle
          can be wrongly put together, or a motor fail to run, a poster to
          attract attention, or a camouflage to conceal?{' '}
          <Box as="a" color="danger" href="/">
            go home
          </Box>
        </span>
      </Pill>

      {isDevelopment && (
        <Pill
          as="pre"
          fontFamily="mono"
          fontSize={0}
          color="white"
          backgroundColor="danger"
          borderColor="danger"
        >
          {stackTrace}
        </Pill>
      )}
    </Stack>
  )
}
