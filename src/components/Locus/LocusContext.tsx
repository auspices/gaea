import { createContext, FC, useContext, useReducer } from 'react'

export enum Status {
  Resting,
  Busy,
}

export enum Visibility {
  Resting,
  Open,
}

export const LocusContext = createContext<
  State & {
    dispatch: React.Dispatch<Action>
  }
>({
  visibility: Visibility.Resting,
  status: Status.Resting,
  dispatch: () => {},
})

type State = {
  visibility: Visibility
  status: Status
}

type Action =
  | { type: 'TOGGLE' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'STATUS'; payload: Status }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        visibility:
          state.visibility === Visibility.Resting
            ? Visibility.Open
            : Visibility.Resting,
      }
    case 'OPEN':
      return {
        ...state,
        visibility: Visibility.Open,
      }
    case 'CLOSE':
      return {
        ...state,
        visibility: Visibility.Resting,
      }
    case 'STATUS':
      return {
        ...state,
        status: action.payload,
      }
    default:
      return state
  }
}

type LocusProviderProps = {
  children: React.ReactNode
}

export const LocusProvider: FC<LocusProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    visibility: Visibility.Resting,
    status: Status.Resting,
  })

  return (
    <LocusContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LocusContext.Provider>
  )
}

export const useLocus = () => {
  return useContext(LocusContext)
}
