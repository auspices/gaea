/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCollectionMutation
// ====================================================

export interface CreateCollectionMutation_createCollection_collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CreateCollectionMutation_createCollection_collection_within {
  __typename: "Collection";
  id: number;
  title: string;
}

export interface CreateCollectionMutation_createCollection_collection {
  __typename: "Collection";
  title: string;
  slug: string;
  id: number;
  key: string | null;
  updatedAt: string;
  counts: CreateCollectionMutation_createCollection_collection_counts;
  within: CreateCollectionMutation_createCollection_collection_within[];
}

export interface CreateCollectionMutation_createCollection {
  __typename: "CreateCollectionPayload";
  collection: CreateCollectionMutation_createCollection_collection;
}

export interface CreateCollectionMutation {
  createCollection: CreateCollectionMutation_createCollection | null;
}

export interface CreateCollectionMutationVariables {
  title: string;
}
