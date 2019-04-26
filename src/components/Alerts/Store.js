import React from 'react'

const initialState = {
  alerts: [],
}

export const Store = React.createContext()

const generateId = () =>
  Math.random()
    .toString(26)
    .slice(2)

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_ALERT':
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: generateId(),
            ...action.payload,
          },
        ],
      }
    case 'REMOVE_ALERT':
      const filtered = state.alerts.filter(alert => alert.id !== action.payload)
      return {
        ...state,
        alerts: filtered,
      }
    default:
      return state
  }
}

export const AlertsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
