import React, { useState } from 'react'
import {
  cellMixin,
  ColorScheme,
  Field,
  pillFocusMixin,
  SCHEMES,
  Stack,
  StackProps,
  THEME,
  useThemer,
} from '@auspices/eos'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js'

import styled, { createGlobalStyle, css } from 'styled-components'

const CARD_ATTRS = {
  variant: 'default',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}

const cardOptions = ({ colors }: { colors: ColorScheme }) => ({
  style: {
    base: {
      iconColor: colors.primary,
      color: colors.primary,
      fontFamily: THEME.fonts.body,
      fontSize: THEME.fontSizes[3],
      fontSmoothing: 'antialiased',
      '::placeholder': { color: colors.secondary },
    },
  },
})

const cardMixin = css`
  ${cellMixin}

  > * {
    flex: 1;
  }
`

const CardNumber = styled(CardNumberElement).attrs(CARD_ATTRS)<{
  ready: boolean
}>`
  ${cardMixin}
`
const CardExpiry = styled(CardExpiryElement).attrs(CARD_ATTRS)<{
  ready: boolean
}>`
  ${cardMixin}
`
const CardCvc = styled(CardCvcElement).attrs(CARD_ATTRS)<{ ready: boolean }>`
  ${cardMixin}
`

const CardStyles = createGlobalStyle`
  .StripeElement {
    cursor: text;
  }

  .StripeElement--focus {
    ${pillFocusMixin}
  }
`

type CreditCardProps = StackProps

export const CreditCard: React.FC<CreditCardProps> = ({ ...rest }) => {
  const { scheme } = useThemer()
  const colors = SCHEMES[scheme]

  const [state, setState] = useState({
    number: { ready: false },
    expiry: { ready: false },
    cvc: { ready: false },
  })

  const handleReady = (name: string) => () => {
    setState((prevState) => ({ ...prevState, [name]: { ready: true } }))
  }

  // Elements resize while they load (why?)
  // Wait until they are ready to display the components
  const ready = Object.entries(state).every(([_key, { ready }]) => ready)

  return (
    <>
      <CardStyles />

      <Stack opacity={ready ? 1 : 0} height={ready ? 'auto' : 0} {...rest}>
        <Field label="card number">
          <CardNumber
            ready={state.number.ready}
            options={cardOptions({ colors })}
            onReady={handleReady('number')}
          />
        </Field>

        <Field label="expiration date">
          <CardExpiry
            ready={state.expiry.ready}
            options={cardOptions({ colors })}
            onReady={handleReady('expiry')}
          />
        </Field>

        <Field label="cvc">
          <CardCvc
            ready={state.cvc.ready}
            options={cardOptions({ colors })}
            onReady={handleReady('cvc')}
          />
        </Field>
      </Stack>
    </>
  )
}
