import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Loading, Stack, useAlerts } from '@auspices/eos'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { SubscribePageQuery } from '../../generated/types/SubscribePageQuery'
import { SubscribeMutation } from '../../generated/types/SubscribeMutation'
import { errorMessage } from '../../util/errors'

const SUBSCRIBE_PAGE_QUERY = gql`
  query SubscribePageQuery {
    me {
      subscriptions
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
        subscriptions
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

  const { sendNotification, sendError } = useAlerts()

  const handleClick = useCallback(async () => {
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
  }, [sendError, sendNotification, subscribe])

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me: { subscriptions },
  } = data

  return (
    <>
      <Helmet>
        <title>subscribe</title>
      </Helmet>

      <Stack>
        {subscriptions.includes('GAEA') ? (
          <Button>already subscribed — thank you</Button>
        ) : (
          <Button onClick={handleClick}>
            {
              {
                [Mode.Resting]: 'subscribe for $35 a month',
                [Mode.Subscribing]: 'subscribing',
                [Mode.Subscribed]: 'thank you',
                [Mode.Error]: 'there was a problem with your subscription',
              }[mode]
            }
          </Button>
        )}
      </Stack>
    </>
  )
}
