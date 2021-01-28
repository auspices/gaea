import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Cell, Loading, Stack, useAlerts } from '@auspices/eos'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import {
  SubscribePageQuery_me_customer_plans as Plan,
  SubscribePageQuery,
} from '../../generated/types/SubscribePageQuery'
import { SubscribeMutation } from '../../generated/types/SubscribeMutation'
import { UnsubscribeMutation } from '../../generated/types/UnsubscribeMutation'
import { ReactivateMutation } from '../../generated/types/ReactivateMutation'
import { PlanInterval } from '../../generated/types/globalTypes'
import { errorMessage } from '../../util/errors'
import { CreditCard } from '../../components/CreditCard'

const SUBSCRIBE_PAGE_FRAGMENT = gql`
  fragment SubscribePageFragment on User {
    customer {
      id
      subscriptions {
        id
        currentPeriodEndAt(relative: true)
        cancelAtPeriodEnd
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
  }
  ${SUBSCRIBE_PAGE_FRAGMENT}
`

const UNSUBSCRIBE_MUTATION = gql`
  mutation UnsubscribeMutation($subscriptionId: String!) {
    unsubscribeFromProduct(input: { subscriptionId: $subscriptionId }) {
      user {
        ...SubscribePageFragment
      }
    }
  }
  ${SUBSCRIBE_PAGE_FRAGMENT}
`

const REACTIVATE_MUTATION = gql`
  mutation ReactivateMutation($subscriptionId: String!) {
    reactivateProductSubscription(input: { subscriptionId: $subscriptionId }) {
      user {
        ...SubscribePageFragment
      }
    }
  }
  ${SUBSCRIBE_PAGE_FRAGMENT}
`

enum Mode {
  Resting,
  Loading,
  Loaded,
  Error,
}

export const SubscribePage: React.FC = () => {
  const { loading, data, error } = useQuery<SubscribePageQuery>(
    SUBSCRIBE_PAGE_QUERY
  )

  const [subscribe] = useMutation<SubscribeMutation>(SUBSCRIBE_MUTATION)
  const [unsubscribe] = useMutation<UnsubscribeMutation>(UNSUBSCRIBE_MUTATION)
  const [reactivate] = useMutation<ReactivateMutation>(REACTIVATE_MUTATION)

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

      if (!state.plan) {
        sendError({ body: 'please select a plan to continue' })
        return
      }

      if (!stripe || !elements) {
        sendError({ body: 'please wait and try again' })
        return
      }

      const cardElement = elements.getElement(CardNumberElement)

      if (!cardElement) {
        sendError({ body: 'unable to subscribe at this time' })
        return
      }

      setMode(Mode.Loading)

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (error || !paymentMethod) {
        setMode(Mode.Error)
        sendError({ body: 'unable to save your payment method' })
        return
      }

      try {
        await subscribe({
          variables: {
            priceId: state.plan.id,
            paymentMethodId: paymentMethod.id,
          },
        })

        setMode(Mode.Loaded)
        sendNotification({ body: 'thank you!' })
      } catch (err) {
        setMode(Mode.Error)
        sendError({ body: errorMessage(err) })
      }

      setTimeout(() => setMode(Mode.Resting), 3000)
    },
    [elements, sendError, sendNotification, state.plan, stripe, subscribe]
  )

  const handleCancel = async () => {
    setMode(Mode.Loading)

    try {
      await unsubscribe({
        variables: {
          subscriptionId: activeSubscription.id,
        },
      })

      setMode(Mode.Loaded)
      sendNotification({ body: 'your subscription has been cancelled' })
    } catch (err) {
      setMode(Mode.Error)
      sendError({ body: errorMessage(err) })
    }

    setTimeout(() => setMode(Mode.Resting), 3000)
  }

  const handleReactivate = async () => {
    setMode(Mode.Loading)

    try {
      await reactivate({
        variables: {
          subscriptionId: activeSubscription.id,
        },
      })

      setMode(Mode.Loaded)
      sendNotification({ body: 'your subscription has been reactivated' })
    } catch (err) {
      setMode(Mode.Error)
      sendError({ body: errorMessage(err) })
    }

    setTimeout(() => setMode(Mode.Resting), 3000)
  }

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

      {activeSubscription && !activeSubscription.cancelAtPeriodEnd && (
        <Stack>
          <Cell>thank you</Cell>,
          <Cell>
            your subscription will auto-renew{' '}
            {activeSubscription.currentPeriodEndAt}
          </Cell>
          <Button onClick={handleCancel}>
            {
              {
                [Mode.Resting]: 'cancel your subscription',
                [Mode.Loading]: 'cancelling',
                [Mode.Loaded]: 'thank you',
                [Mode.Error]:
                  'there was a problem when cancelling your subscription',
              }[mode]
            }
          </Button>
        </Stack>
      )}

      {activeSubscription && activeSubscription.cancelAtPeriodEnd && (
        <Stack>
          <Cell>
            your subscription will end {activeSubscription.currentPeriodEndAt}
          </Cell>
          <Button onClick={handleReactivate}>
            {
              {
                [Mode.Resting]: 'reactivate your subscription',
                [Mode.Loading]: 'reactivating',
                [Mode.Loaded]: 'thank you',
                [Mode.Error]:
                  'there was a problem when reactivating your subscription',
              }[mode]
            }
          </Button>
        </Stack>
      )}

      {!activeSubscription && (
        <form onSubmit={handleSubmit}>
          <Stack>
            <Cell>choose a plan</Cell>
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

            <Button disabled={!state.plan}>
              {
                {
                  [Mode.Resting]: state.plan
                    ? `subscribe for ${
                        state.plan.amount
                      } a ${state.plan.interval.toLowerCase()}`
                    : 'choose a plan',
                  [Mode.Loading]: 'subscribing',
                  [Mode.Loaded]: 'thank you',
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
