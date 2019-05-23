import React from 'react'
import { storiesOf } from '@storybook/react'

import { TextInput, BorderedTextInput } from 'components/UI/Inputs'
import { Field } from 'components/UI/Field'
import { KeyValueInput } from 'components/UI/KeyValueInput'
import { KeyValueEditor } from 'components/UI/KeyValueEditor'

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
      <BorderedTextInput placeholder="first" width="100%" />
      <BorderedTextInput placeholder="second" width="100%" />
      <BorderedTextInput placeholder="third" width="100%" />
    </>
  ))
  .add('Field', () => (
    <>
      <Field
        label="label"
        input={{
          placeholder: 'input',
        }}
      />

      <Field
        label="some other input"
        input={{
          placeholder: 'this is a placeholder',
        }}
      />
    </>
  ))
  .add('KeyValueInput', () => (
    <>
      <KeyValueInput
        k={{
          placeholder: 'key a',
        }}
        v={{
          placeholder: 'value a',
        }}
      />
      <KeyValueInput
        k={{
          placeholder: 'key b',
        }}
        v={{
          placeholder: 'value b',
        }}
      />
    </>
  ))
  .add('KeyValueEditor', () => (
    <KeyValueEditor
      schema={[
        { name: 'foo', type: 'string' },
        { name: 'bar', type: 'string' },
        { name: 'qux', type: 'string' },
      ]}
      data={{
        foo: 'bar',
        bar: 'baz',
        qux: 'foo',
      }}
    />
  ))
