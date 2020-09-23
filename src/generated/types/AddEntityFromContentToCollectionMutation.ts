/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddEntityFromContentToCollectionMutation
// ====================================================

export interface AddEntityFromContentToCollectionMutation_addEntityFromContentToCollection_collection {
  __typename: "Collection";
  id: number;
}

export interface AddEntityFromContentToCollectionMutation_addEntityFromContentToCollection_content {
  __typename: "Content";
  id: number;
}

export interface AddEntityFromContentToCollectionMutation_addEntityFromContentToCollection {
  __typename: "AddEntityFromContentToCollectionPayload";
  collection: AddEntityFromContentToCollectionMutation_addEntityFromContentToCollection_collection;
  content: AddEntityFromContentToCollectionMutation_addEntityFromContentToCollection_content;
}

export interface AddEntityFromContentToCollectionMutation {
  addEntityFromContentToCollection: AddEntityFromContentToCollectionMutation_addEntityFromContentToCollection | null;
}

export interface AddEntityFromContentToCollectionMutationVariables {
  id: string;
  contentId: string;
}
