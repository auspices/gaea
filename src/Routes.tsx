import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import parseRoute from './util/parseRoute'

import { RedirectHome } from './components/RedirectHome'

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
        const jwt = localStorage.getItem('jwt')
        const isLoggedIn = !!jwt

        if (!isLoggedIn) {
          return <Redirect to="/login" />
        }

        return <RedirectHome />
      }}
    />

    <Route exact path="/login" component={Login} />

    <Route
      exact
      path="/:username/xs"
      component={parseRoute(({ query: { page, per } }) => (
        <Collections page={page} per={per} />
      ))}
    />

    <Route
      exact
      path="/:username/xs/:id"
      component={parseRoute(({ params: { id }, query: { page, per } }) => (
        <Collection id={id} page={page} per={per} />
      ))}
    />

    <Route
      exact
      path="/:username/x/:id"
      component={parseRoute(({ params }) => (
        <Content id={params.id} />
      ))}
    />
  </Switch>
)
