import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import {
  Alerts,
  AlertsProvider,
  Box,
  GlobalStyles,
  ThemerProvider,
  useThemer,
} from '@auspices/eos'
import { initClient } from './apollo/initClient'
import { Routes } from './Routes'

const client = initClient()

const App = () => {
  const { theme } = useThemer()

  return (
    <ThemeProvider theme={theme}>
      <AlertsProvider>
        <Box
          display="flex"
          flexDirection="column"
          p={[0, 0, 2, 4]}
          minHeight="100vh"
        >
          <GlobalStyles />

          <Alerts
            position="fixed"
            bottom={4}
            left={4}
            width="20rem"
            zIndex={1}
          />

          <Routes />
        </Box>
      </AlertsProvider>
    </ThemeProvider>
  )
}

export default () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemerProvider>
          <App />
        </ThemerProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}
