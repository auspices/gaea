/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlanInterval } from "./globalTypes";

// ====================================================
// GraphQL fragment: SubscribePageFragment
// ====================================================

export interface SubscribePageFragment_customer_subscriptions {
  __typename: "Subscription";
  id: string;
  currentPeriodEndAt: string;
  cancelAtPeriodEnd: boolean;
}

export interface SubscribePageFragment_customer_plans {
  __typename: "Plan";
  id: string;
  interval: PlanInterval;
  amount: string;
}

export interface SubscribePageFragment_customer {
  __typename: "Customer";
  id: string;
  subscriptions: SubscribePageFragment_customer_subscriptions[];
  plans: SubscribePageFragment_customer_plans[];
}

export interface SubscribePageFragment {
  __typename: "User";
  customer: SubscribePageFragment_customer;
}
