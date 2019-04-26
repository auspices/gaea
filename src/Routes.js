import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import parseRoute from './util/parseRoute'

import Login from './pages/Login'
import Collections from './pages/Collections'
import Collection from './pages/Collection'
import Content from './pages/Content'

export default () => (
  <Switch>
    <Route
      exact
      path="/"
      component={() => {
        const isLoggedIn = !!localStorage.getItem('jwt')

        return isLoggedIn ? (
          <Redirect to="/collections" />
        ) : (
          <Redirect to="/login" />
        )
      }}
    />

    <Route exact path="/login" component={Login} />

    <Route exact path="/collections" component={Collections} />

    <Route
      exact
      path="/collections/:id"
      component={parseRoute(({ params: { id }, query: { page, per } }) => (
        <Collection
          id={id}
          page={page ? parseInt(page, 10) : 1}
          per={per ? parseInt(per, 10) : 24}
        />
      ))}
    />

    <Route
      exact
      path="/content/:type/:id"
      component={parseRoute(({ params }) => (
        <Content type={params.type.toUpperCase()} id={params.id} />
      ))}
    />
  </Switch>
)
