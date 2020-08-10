/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlanInterval } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ReactivateMutation
// ====================================================

export interface ReactivateMutation_reactivateProductSubscription_user_customer_subscriptions {
  __typename: "Subscription";
  id: string;
  currentPeriodEndAt: string;
  cancelAtPeriodEnd: boolean;
}

export interface ReactivateMutation_reactivateProductSubscription_user_customer_plans {
  __typename: "Plan";
  id: string;
  interval: PlanInterval;
  amount: string;
}

export interface ReactivateMutation_reactivateProductSubscription_user_customer {
  __typename: "Customer";
  id: string;
  subscriptions: ReactivateMutation_reactivateProductSubscription_user_customer_subscriptions[];
  plans: ReactivateMutation_reactivateProductSubscription_user_customer_plans[];
}

export interface ReactivateMutation_reactivateProductSubscription_user {
  __typename: "User";
  customer: ReactivateMutation_reactivateProductSubscription_user_customer;
}

export interface ReactivateMutation_reactivateProductSubscription {
  __typename: "ReactivateProductSubscriptionPayload";
  user: ReactivateMutation_reactivateProductSubscription_user;
}

export interface ReactivateMutation {
  reactivateProductSubscription: ReactivateMutation_reactivateProductSubscription | null;
}

export interface ReactivateMutationVariables {
  subscriptionId: string;
}
