/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntityTypes } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddEntityToCollectionMutation
// ====================================================

export interface AddEntityToCollectionMutation_addEntityToCollection_collection {
  __typename: "Collection";
  id: number;
}

export interface AddEntityToCollectionMutation_addEntityToCollection_content {
  __typename: "Content";
  id: number;
}

export interface AddEntityToCollectionMutation_addEntityToCollection {
  __typename: "AddEntityToCollectionPayload";
  collection: AddEntityToCollectionMutation_addEntityToCollection_collection;
  content: AddEntityToCollectionMutation_addEntityToCollection_content;
}

export interface AddEntityToCollectionMutation {
  addEntityToCollection: AddEntityToCollectionMutation_addEntityToCollection | null;
}

export interface AddEntityToCollectionMutationVariables {
  id: string;
  entityId: string;
  entityType: EntityTypes;
}
