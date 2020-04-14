/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCollectionToCollectionMutation
// ====================================================

export interface AddCollectionToCollectionMutation_addEntityToCollection_collection {
  __typename: "Collection";
  id: number;
}

export interface AddCollectionToCollectionMutation_addEntityToCollection_content {
  __typename: "Content";
  id: number;
}

export interface AddCollectionToCollectionMutation_addEntityToCollection {
  __typename: "AddEntityToCollectionPayload";
  collection: AddCollectionToCollectionMutation_addEntityToCollection_collection;
  content: AddCollectionToCollectionMutation_addEntityToCollection_content;
}

export interface AddCollectionToCollectionMutation {
  addEntityToCollection: AddCollectionToCollectionMutation_addEntityToCollection | null;
}

export interface AddCollectionToCollectionMutationVariables {
  parentId: string;
  childId: string;
}
