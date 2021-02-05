import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PATTERNS, useHrefs } from './hooks'
import { parseRoute } from './util/parseRoute'
import { RedirectHome } from './components/RedirectHome'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { CollectionPage } from './pages/CollectionPage'
import { CollectionSettingsPage } from './pages/CollectionSettingsPage'
import { ContentPage } from './pages/ContentPage'
import { AccountPage } from './pages/AccountPage'
import { SubscribePage } from './pages/SubscribePage'
import { ErrorBoundary } from './components/ErrorBoundary'
import { CreditCardProvider } from './components/CreditCard'
import { CapturePage } from './pages/CapturePage'

export const Routes = () => {
  const hrefs = useHrefs()

  return (
    <Switch>
      <Route
        exact
        path={PATTERNS.root}
        component={() => {
          const jwt = localStorage.getItem('jwt')
          const isLoggedIn = !!jwt

          if (!isLoggedIn) {
            return <Redirect to={hrefs.login()} />
          }

          return (
            <ErrorBoundary>
              <RedirectHome />
            </ErrorBoundary>
          )
        }}
      />

      <Route
        exact
        path={PATTERNS.account}
        component={() => (
          <ErrorBoundary>
            <AccountPage />
          </ErrorBoundary>
        )}
      />

      <Route
        exact
        path={PATTERNS.login}
        component={() => (
          <ErrorBoundary>
            <LoginPage />
          </ErrorBoundary>
        )}
      />

      <Route
        exact
        path={PATTERNS.register}
        component={() => (
          <ErrorBoundary>
            <RegisterPage />
          </ErrorBoundary>
        )}
      />

      <Route
        exact
        path={PATTERNS.subscribe}
        component={() => (
          <ErrorBoundary>
            <CreditCardProvider>
              <SubscribePage />
            </CreditCardProvider>
          </ErrorBoundary>
        )}
      />

      <Route
        exact
        path={PATTERNS.collections}
        component={parseRoute(() => (
          <ErrorBoundary>
            <CollectionsPage />
          </ErrorBoundary>
        ))}
      />

      <Route
        exact
        path={PATTERNS.collection}
        component={parseRoute(({ params: { id } }) => (
          <ErrorBoundary>
            <CollectionPage id={id} />
          </ErrorBoundary>
        ))}
      />

      <Route
        exact
        path={PATTERNS.collectionSettings}
        component={parseRoute(({ params: { id } }) => (
          <ErrorBoundary>
            <CollectionSettingsPage id={id} />
          </ErrorBoundary>
        ))}
      />

      <Route
        exact
        path={PATTERNS.content}
        component={parseRoute(({ params }) => (
          <ErrorBoundary>
            <ContentPage id={params.id} />
          </ErrorBoundary>
        ))}
      />

      <Route
        exact
        path={PATTERNS.capture}
        component={parseRoute(({ params }) => (
          <ErrorBoundary>
            <CapturePage />
          </ErrorBoundary>
        ))}
      />
    </Switch>
  )
}
