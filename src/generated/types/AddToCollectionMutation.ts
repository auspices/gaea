/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToCollectionMutation
// ====================================================

export interface AddToCollectionMutation_addToCollection_collection {
  __typename: "Collection";
  id: number;
}

export interface AddToCollectionMutation_addToCollection_content {
  __typename: "Content";
  id: number;
}

export interface AddToCollectionMutation_addToCollection {
  __typename: "AddToCollectionPayload";
  collection: AddToCollectionMutation_addToCollection_collection;
  content: AddToCollectionMutation_addToCollection_content;
}

export interface AddToCollectionMutation {
  addToCollection: AddToCollectionMutation_addToCollection | null;
}

export interface AddToCollectionMutationVariables {
  id: string;
  value: string;
}
