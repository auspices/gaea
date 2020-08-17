import React from 'react'
import { loadStripe } from '@stripe/stripe-js/pure'
import { Elements } from '@stripe/react-stripe-js'

export const CreditCardProvider: React.FC = ({ children }) => {
  return (
    <Elements
      stripe={loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)}
    >
      {children}
    </Elements>
  )
}
