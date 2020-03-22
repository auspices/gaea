import { ApolloError } from 'apollo-client'

export type GraphQLError = {
  message: string
  path: string[]
  locations: [
    {
      line: number
      column: number
    }
  ]
  extensions: {
    code?: string
  }
}

export type GenericError =
  | (Error & { graphQLErrors?: GraphQLError[] })
  | ApolloError

export const errorCode = (error: GenericError) => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const [err] = error.graphQLErrors
    return err.extensions?.code
  }

  return null
}

export const errorMessage = (error: GenericError) => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const code = errorCode(error)

    switch (code) {
      case 'NOT_FOUND':
        return 'not found'
      default:
        const errs = error.graphQLErrors
        return [...errs]
          .map((err) => err.message)
          .join(',')
          .toLowerCase()
    }
  }

  return error.message.toLowerCase()
}
