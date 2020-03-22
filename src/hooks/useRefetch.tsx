import React, { createContext, useContext } from 'react'

const RefetchContext = createContext<{ refetch(): Promise<any> }>({
  refetch: () => Promise.resolve(),
})

type RefetchProviderProps = {
  refetch(): Promise<any>
}

export const RefetchProvider: React.FC<RefetchProviderProps> = ({
  children,
  refetch,
}) => {
  return (
    <RefetchContext.Provider value={{ refetch }}>
      {children}
    </RefetchContext.Provider>
  )
}

export const useRefetch = () => {
  const { refetch } = useContext(RefetchContext)
  return { refetch }
}
