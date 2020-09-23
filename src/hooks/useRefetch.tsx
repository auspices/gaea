import React, {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'

type Refetch = () => Promise<any>

const DEFAULT_REFETCH: Refetch = () => Promise.resolve()

const RefetchContext = createContext<{
  refetch: MutableRefObject<Refetch>
  setRefetch(nextRefetch: Refetch): void
}>({
  refetch: { current: DEFAULT_REFETCH },
  setRefetch: () => {},
})

type RefetchProviderProps = { refetch?: Refetch }

export const RefetchProvider: React.FC<RefetchProviderProps> = ({
  children,
  refetch = () => Promise.resolve(),
}) => {
  const ref = useRef(refetch)

  const setRefetch = useCallback((nextRefetch: () => Promise<any>) => {
    ref.current = nextRefetch
  }, [])

  return (
    <RefetchContext.Provider value={{ refetch: ref, setRefetch }}>
      {children}
    </RefetchContext.Provider>
  )
}

export const useRefetch = ({
  refetch: nextRefetch,
}: {
  refetch?: Refetch
} = {}) => {
  const { setRefetch, refetch } = useContext(RefetchContext)

  useEffect(() => {
    if (!nextRefetch) return
    setRefetch(nextRefetch)
  }, [nextRefetch, setRefetch])

  return { setRefetch, refetch: refetch?.current ?? DEFAULT_REFETCH }
}
