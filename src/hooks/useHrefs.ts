import { useParams } from 'react-router-dom'

export const useHrefs = () => {
  const { username: __username__ } = useParams()

  return {
    root: () => '/',
    login: () => '/login',
    account: () => '/account',

    collections: (username?: string) => `/${__username__ || username}/xs`,

    collection: (id: string, username?: string) =>
      `/${__username__ || username}/xs/${id}`,

    content: (id: number, username?: string) =>
      `/${__username__ || username}/x/${id}`,
  }
}
