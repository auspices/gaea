/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlanInterval } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubscribeMutation
// ====================================================

export interface SubscribeMutation_subscribeToProduct_user_customer_subscriptions {
  __typename: "Subscription";
  id: string;
  currentPeriodEndAt: string;
  cancelAtPeriodEnd: boolean;
}

export interface SubscribeMutation_subscribeToProduct_user_customer_plans {
  __typename: "Plan";
  id: string;
  interval: PlanInterval;
  amount: string;
}

export interface SubscribeMutation_subscribeToProduct_user_customer {
  __typename: "Customer";
  id: string;
  subscriptions: SubscribeMutation_subscribeToProduct_user_customer_subscriptions[];
  plans: SubscribeMutation_subscribeToProduct_user_customer_plans[];
}

export interface SubscribeMutation_subscribeToProduct_user {
  __typename: "User";
  customer: SubscribeMutation_subscribeToProduct_user_customer;
}

export interface SubscribeMutation_subscribeToProduct {
  __typename: "SubscribeToProductPayload";
  user: SubscribeMutation_subscribeToProduct_user;
}

export interface SubscribeMutation {
  subscribeToProduct: SubscribeMutation_subscribeToProduct | null;
}

export interface SubscribeMutationVariables {
  priceId: string;
  paymentMethodId: string;
}
