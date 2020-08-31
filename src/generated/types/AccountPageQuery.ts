/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountPageQuery
// ====================================================

export interface AccountPageQuery_me {
  __typename: "User";
  id: number;
  slug: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface AccountPageQuery {
  /**
   * The logged in current user  
   */
  me: AccountPageQuery_me;
}
