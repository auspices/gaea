/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubscribePageQuery
// ====================================================

export interface SubscribePageQuery_me_customer_subscriptions {
  __typename: "Subscription";
  id: string;
  currentPeriodEndAt: string;
}

export interface SubscribePageQuery_me_customer {
  __typename: "Customer";
  id: string;
  subscriptions: SubscribePageQuery_me_customer_subscriptions[];
}

export interface SubscribePageQuery_me {
  __typename: "User";
  customer: SubscribePageQuery_me_customer;
}

export interface SubscribePageQuery {
  me: SubscribePageQuery_me;
}
