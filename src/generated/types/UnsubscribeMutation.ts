/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlanInterval } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UnsubscribeMutation
// ====================================================

export interface UnsubscribeMutation_unsubscribeFromProduct_user_customer_subscriptions {
  __typename: "Subscription";
  id: string;
  currentPeriodEndAt: string;
  cancelAtPeriodEnd: boolean;
}

export interface UnsubscribeMutation_unsubscribeFromProduct_user_customer_plans {
  __typename: "Plan";
  id: string;
  interval: PlanInterval;
  amount: string;
}

export interface UnsubscribeMutation_unsubscribeFromProduct_user_customer {
  __typename: "Customer";
  id: string;
  subscriptions: UnsubscribeMutation_unsubscribeFromProduct_user_customer_subscriptions[];
  plans: UnsubscribeMutation_unsubscribeFromProduct_user_customer_plans[];
}

export interface UnsubscribeMutation_unsubscribeFromProduct_user {
  __typename: "User";
  customer: UnsubscribeMutation_unsubscribeFromProduct_user_customer;
}

export interface UnsubscribeMutation_unsubscribeFromProduct {
  __typename: "UnsubscribeFromProductPayload";
  user: UnsubscribeMutation_unsubscribeFromProduct_user;
}

export interface UnsubscribeMutation {
  unsubscribeFromProduct: UnsubscribeMutation_unsubscribeFromProduct | null;
}

export interface UnsubscribeMutationVariables {
  subscriptionId: string;
}
