import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!)

export const CreditCardProvider: React.FC = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
)
