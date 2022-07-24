import React from 'react'
import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom'
import { PATTERNS, useHrefs } from './hooks'
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
import { HomePage } from './pages/HomePage'

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path={PATTERNS.root} element={<Root />} />

      <Route
        path={PATTERNS.account}
        element={
          <ErrorBoundary>
            <AccountPage />
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.login}
        element={
          <ErrorBoundary>
            <LoginPage />
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.register}
        element={
          <ErrorBoundary>
            <RegisterPage />
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.subscribe}
        element={
          <ErrorBoundary>
            <CreditCardProvider>
              <SubscribePage />
            </CreditCardProvider>
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.collections}
        element={
          <ErrorBoundary>
            <CollectionsPage />
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.newCollections}
        element={
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.collection}
        element={
          <ErrorBoundary>
            <CollectionPage />
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.collectionSettings}
        element={
          <ErrorBoundary>
            <CollectionSettingsPage />
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.content}
        element={
          <ErrorBoundary>
            <ContentPage />
          </ErrorBoundary>
        }
      />

      <Route
        path={PATTERNS.capture}
        element={
          <ErrorBoundary>
            <CapturePage />
          </ErrorBoundary>
        }
      />
    </ReactRouterRoutes>
  )
}

const Root = () => {
  const hrefs = useHrefs()

  const jwt = localStorage.getItem('jwt')
  const isLoggedIn = !!jwt

  if (!isLoggedIn) {
    return <Navigate to={hrefs.login()} />
  }

  return (
    <ErrorBoundary>
      <RedirectHome />
    </ErrorBoundary>
  )
}
