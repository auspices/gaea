import React from 'react'
import { storiesOf } from '@storybook/react'

import { Alert } from '../components/UI/Alert'

storiesOf('Alert', module).add('types', () => (
  <>
    <Alert alert={{ id: 1, type: 'ALERT' }} onRemove={() => {}}>
      Thing added successfully
    </Alert>

    <Alert alert={{ id: 2, type: 'ALERT' }} onRemove={() => {}}>
      Neutral thing
    </Alert>

    <Alert
      alert={{
        id: 3,
        type: 'ERROR',
        message: 'Bad thing',
      }}
      onRemove={() => {}}
    />
  </>
))
