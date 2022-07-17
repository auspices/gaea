import React from 'react'

type Instance = HTMLElement | null

const ContextualRefsContext = React.createContext<{
  register: (key: string, current: Instance) => void
  store: React.MutableRefObject<Map<string, Instance> | null>
}>({
  register: () => {},
  store: { current: null },
})

type ContextualRefsProviderProps = {
  children: React.ReactNode
}

export const ContextualRefsProvider: React.FC<ContextualRefsProviderProps> = ({
  children,
}) => {
  const store = React.useRef<Map<string, Instance>>(new Map())

  const register = React.useCallback((key: string, current: Instance) => {
    store.current.set(key, current)
  }, [])

  return (
    <ContextualRefsContext.Provider value={{ register, store }}>
      {children}
    </ContextualRefsContext.Provider>
  )
}

export const useContextualRef = () => {
  const { register, store } = React.useContext(ContextualRefsContext)
  return {
    setContextualRef: (key: string) => (current: Instance) =>
      register(key, current),
    getContextualRef: (key: string) => ({ current: store.current?.get(key) }),
  }
}
