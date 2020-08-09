import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Loading, Pill, Stack, useAlerts } from '@auspices/eos'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import {
  SubscribePageQuery_me_customer_plans as Plan,
  SubscribePageQuery,
} from '../../generated/types/SubscribePageQuery'
import { SubscribeMutation } from '../../generated/types/SubscribeMutation'
import { PlanInterval } from '../../generated/types/globalTypes'
import { errorMessage } from '../../util/errors'
import { CreditCard } from '../../components/CreditCard'
import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

const SUBSCRIBE_PAGE_FRAGMENT = gql`
  fragment SubscribePageFragment on User {
    customer {
      id
      subscriptions {
        id
        currentPeriodEndAt(relative: true)
      }
      plans {
        id
        interval
        amount
      }
    }
  }
`

const SUBSCRIBE_PAGE_QUERY = gql`
  query SubscribePageQuery {
    me {
      ...SubscribePageFragment
    }
  }
  ${SUBSCRIBE_PAGE_FRAGMENT}
`

const SUBSCRIBE_MUTATION = gql`
  mutation SubscribeMutation($priceId: String!, $paymentMethodId: String!) {
    subscribeToProduct(
      input: {
        product: GAEA
        priceId: $priceId
        paymentMethodId: $paymentMethodId
      }
    ) {
      user {
        ...SubscribePageFragment
      }
    }
    ${SUBSCRIBE_PAGE_FRAGMENT}
  }
`

enum Mode {
  Resting,
  Subscribing,
  Subscribed,
  Error,
}

export const SubscribePage: React.FC = () => {
  const { loading, data, error } = useQuery<SubscribePageQuery>(
    SUBSCRIBE_PAGE_QUERY
  )

  const [subscribe] = useMutation<SubscribeMutation>(SUBSCRIBE_MUTATION)

  const [mode, setMode] = useState(Mode.Resting)
  const [state, setState] = useState<
    Partial<{ plan: Plan; paymentMethodId: string }>
  >({})

  const { sendNotification, sendError } = useAlerts()

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!state.plan?.id) {
        sendError({ body: 'please select a plan to continue' })
        return
      }

      if (!stripe || !elements) {
        console.error('Stripe.js has not loaded yet')
        sendError({ body: 'please wait and try again' })
        return
      }

      const cardElement = elements.getElement(CardNumberElement)

      if (!cardElement) {
        console.error('Unable to find a CardElement')
        sendError({ body: 'unable to subscribe at this time' })
        return
      }

      setMode(Mode.Subscribing)

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (error || !paymentMethod) {
        setMode(Mode.Error)
        sendError({ body: 'unable to save your payment method' })
        console.error(error)
        return
      }

      try {
        await subscribe({
          variables: {
            priceId: state.plan.id,
            paymentMethodId: paymentMethod.id,
          },
        })

        setMode(Mode.Subscribed)
        sendNotification({ body: 'thank you!' })
      } catch (err) {
        setMode(Mode.Error)
        sendError({ body: errorMessage(err) })
      }
    },
    [elements, sendError, sendNotification, state.plan, stripe, subscribe]
  )

  const selectPlan = (plan: Plan) => {
    setState((prevState) => ({ ...prevState, plan }))
  }

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me: { customer },
  } = data

  const [activeSubscription] = customer.subscriptions

  return (
    <>
      <Helmet>
        <title>subscribe</title>
      </Helmet>

      {activeSubscription ? (
        <Stack>
          <Pill>thank you</Pill>,
          <Pill>
            your subscription will auto-renew in{' '}
            {activeSubscription.currentPeriodEndAt}
          </Pill>
          <Button>cancel your subscription</Button>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack>
            <Pill>choose a plan</Pill>
            <Stack direction="horizontal">
              {customer.plans.map((plan) => {
                return (
                  <Button
                    key={plan.id}
                    flex="1"
                    onClick={(event) => {
                      event.preventDefault()
                      selectPlan(plan)
                    }}
                    selected={state.plan?.id === plan.id}
                  >
                    {plan.amount} /{' '}
                    {
                      {
                        [PlanInterval.YEAR]: 'yearly',
                        [PlanInterval.MONTH]: 'monthly',
                        [PlanInterval.WEEK]: 'weekly',
                        [PlanInterval.DAY]: 'daily',
                      }[plan.interval]
                    }
                  </Button>
                )
              })}
            </Stack>

            <CreditCard />

            <Button>
              {
                {
                  [Mode.Resting]: `subscribe ${
                    state.plan ? `for ${state.plan.amount}` : ''
                  }`,
                  [Mode.Subscribing]: 'subscribing',
                  [Mode.Subscribed]: 'thank you',
                  [Mode.Error]: 'there was a problem with your subscription',
                }[mode]
              }
            </Button>
          </Stack>
        </form>
      )}
    </>
  )
}
