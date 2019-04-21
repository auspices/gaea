export default (error) => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const firstError = error.graphQLErrors[0];
    const extensions = firstError.extensions;
    const code = extensions && extensions.code;

    switch (code) {
      case 'NOT_FOUND':
        return 'Not found'
      default:
        return error.graphQLErrors.map(({ message }) => message).join(', ');
    }
  }

  return error.message;
};
