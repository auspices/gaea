export const errorCode = error => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const firstError = error.graphQLErrors[0]
    const extensions = firstError.extensions
    const code = extensions && extensions.code
    return code
  }

  return null
}

export const errorMessage = error => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const code = errorCode(error)

    switch (code) {
      case 'NOT_FOUND':
        return 'Not found'
      default:
        return error.graphQLErrors.map(({ message }) => message).join(', ')
    }
  }

  return error.message
}
