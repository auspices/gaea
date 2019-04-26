import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import initClient from 'apollo/initClient'

import theme from 'styles/theme'

import Routes from './Routes'
import Page from 'components/UI/Page'
import Alerts from 'components/Alerts'
import { AlertsProvider } from 'components/Alerts/Store'

const client = initClient()

export default () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AlertsProvider>
          <Page>
            <Alerts />
            <Routes />
          </Page>
        </AlertsProvider>
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
)
