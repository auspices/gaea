/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterPageMutation
// ====================================================

export interface RegisterPageMutation_register_user {
  __typename: "User";
  id: number;
  slug: string;
}

export interface RegisterPageMutation_register {
  __typename: "RegisterPayload";
  jwt: string;
  user: RegisterPageMutation_register_user;
}

export interface RegisterPageMutation {
  register: RegisterPageMutation_register | null;
}

export interface RegisterPageMutationVariables {
  secret: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
}
