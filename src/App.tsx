import React from 'react'
import { Helmet } from 'react-helmet'
import { ApolloProvider } from '@apollo/client'
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
import { ContextualRefsProvider } from './hooks'
import { initClient } from './apollo/initClient'
import { Routes } from './Routes'
import { Z } from './util/zIndexes'

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
            right={4}
            width="20rem"
            zIndex={Z.ALERTS}
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
        <ContextualRefsProvider>
          <ThemerProvider>
            <Helmet
              defaultTitle="loading / auspices"
              titleTemplate="%s / auspices"
            />

            <App />
          </ThemerProvider>
        </ContextualRefsProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}
