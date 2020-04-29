import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useHrefs } from './hooks'
import { parseRoute } from './util/parseRoute'
import { RedirectHome } from './components/RedirectHome'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { CollectionPage } from './pages/CollectionPage'
import { CollectionSettingsPage } from './pages/CollectionSettingsPage'
import { ContentPage } from './pages/ContentPage'
import { AccountPage } from './pages/AccountPage'
import { ErrorBoundary } from './components/ErrorBoundary'

export const Routes = () => {
  const hrefs = useHrefs()

  return (
    <Switch>
      <Route
        exact
        path="/"
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
        path="/account"
        component={() => (
          <ErrorBoundary>
            <AccountPage />
          </ErrorBoundary>
        )}
      />

      <Route
        exact
        path="/login"
        component={() => (
          <ErrorBoundary>
            <LoginPage />
          </ErrorBoundary>
        )}
      />

      <Route
        exact
        path="/register"
        component={() => (
          <ErrorBoundary>
            <RegisterPage />
          </ErrorBoundary>
        )}
      />

      <Route
        exact
        path="/xs"
        component={parseRoute(() => (
          <ErrorBoundary>
            <CollectionsPage />
          </ErrorBoundary>
        ))}
      />

      <Route
        exact
        path="/xs/:id"
        component={parseRoute(({ params: { id } }) => (
          <ErrorBoundary>
            <CollectionPage id={id} />
          </ErrorBoundary>
        ))}
      />

      <Route
        exact
        path="/xs/:id/settings"
        component={parseRoute(({ params: { id } }) => (
          <ErrorBoundary>
            <CollectionSettingsPage id={id} />
          </ErrorBoundary>
        ))}
      />

      <Route
        exact
        path="/x/:id"
        component={parseRoute(({ params }) => (
          <ErrorBoundary>
            <ContentPage id={params.id} />
          </ErrorBoundary>
        ))}
      />
    </Switch>
  )
}
