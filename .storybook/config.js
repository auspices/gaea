import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import 'index.css'

import theme from 'styles/theme'

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)

addParameters({
  options: {
    showPanel: false,
    sortStoriesByKind: true,
    sidebarAnimations: false,
  },
})

const req = require.context(
  '../src/stories',
  true,
  /\.stories\.(ts|tsx|js|jsx)$/
)

const loadStories = () => req.keys().forEach(filename => req(filename))

configure(loadStories, module)
