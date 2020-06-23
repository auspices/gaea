/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubscribeMutation
// ====================================================

export interface SubscribeMutation_subscribeToProduct_user {
  __typename: "User";
  subscriptions: string[];
}

export interface SubscribeMutation_subscribeToProduct {
  __typename: "SubscribeToProductPayload";
  user: SubscribeMutation_subscribeToProduct_user;
}

export interface SubscribeMutation {
  subscribeToProduct: SubscribeMutation_subscribeToProduct | null;
}
