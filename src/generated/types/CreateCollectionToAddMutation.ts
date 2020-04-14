/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCollectionToAddMutation
// ====================================================

export interface CreateCollectionToAddMutation_createCollection_collection {
  __typename: "Collection";
  id: number;
  name: string;
}

export interface CreateCollectionToAddMutation_createCollection {
  __typename: "CreateCollectionPayload";
  collection: CreateCollectionToAddMutation_createCollection_collection;
}

export interface CreateCollectionToAddMutation {
  createCollection: CreateCollectionToAddMutation_createCollection | null;
}

export interface CreateCollectionToAddMutationVariables {
  title: string;
}
