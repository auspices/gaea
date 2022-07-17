import React from 'react'
import { loadStripe } from '@stripe/stripe-js/pure'
import { Elements } from '@stripe/react-stripe-js'

type CreditCardProviderProps = {
  children: React.ReactNode
}

export const CreditCardProvider: React.FC<CreditCardProviderProps> = ({
  children,
}) => {
  return (
    <Elements
      stripe={loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)}
    >
      {children}
    </Elements>
  )
}
