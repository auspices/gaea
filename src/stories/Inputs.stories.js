import React from 'react'
import { storiesOf } from '@storybook/react'

import { TextInput, BorderedTextInput } from 'components/UI/Inputs'

storiesOf('Inputs', module)
  .add('TextInput', () => <TextInput placeholder="example input" />)
  .add('BorderedTextInput', () => (
    <>
      <BorderedTextInput placeholder="example input" />
      <BorderedTextInput
        placeholder="example input - width='100%'"
        width="100%"
      />
    </>
  ))
  .add('stacked BorderedTextInput', () => (
    <>
      <BorderedTextInput placeholder="first" width="100%" borderRadius={0} />
      <BorderedTextInput placeholder="second" width="100%" />
      <BorderedTextInput placeholder="third" width="100%" />
    </>
  ))
