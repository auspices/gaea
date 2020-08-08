import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Input, Loading, Pill, Stack, useAlerts } from '@auspices/eos'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import {
  SubscribePageQuery_me_customer_plans as Plan,
  SubscribePageQuery,
} from '../../generated/types/SubscribePageQuery'
import { SubscribeMutation } from '../../generated/types/SubscribeMutation'
import { errorMessage } from '../../util/errors'
import { PlanInterval } from 'generated/types/globalTypes'

const SUBSCRIBE_PAGE_QUERY = gql`
  query SubscribePageQuery {
    me {
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
  }
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
        id
      }
    }
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

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setMode(Mode.Subscribing)

      try {
        await subscribe({
          variables: {
            priceId: 'TODO',
            paymentMethodId: 'TODO',
          },
        })

        setMode(Mode.Subscribed)
        sendNotification({ body: 'thank you!' })
      } catch (err) {
        setMode(Mode.Error)
        sendError({ body: errorMessage(err) })
      }
    },
    [sendError, sendNotification, subscribe]
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
        <form>
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

            <Input placeholder="TODO" />

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
