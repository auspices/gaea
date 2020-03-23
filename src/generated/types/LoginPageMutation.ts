/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginPageMutation
// ====================================================

export interface LoginPageMutation_login_user {
  __typename: "User";
  slug: string;
}

export interface LoginPageMutation_login {
  __typename: "LoginPayload";
  jwt: string;
  user: LoginPageMutation_login_user;
}

export interface LoginPageMutation {
  login: LoginPageMutation_login | null;
}

export interface LoginPageMutationVariables {
  username: string;
  password: string;
}
