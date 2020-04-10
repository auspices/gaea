/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PublishCollectionMutation
// ====================================================

export interface PublishCollectionMutation_publishCollection_collection {
  __typename: "Collection";
  id: number;
  key: string | null;
}

export interface PublishCollectionMutation_publishCollection {
  __typename: "PublishCollectionPayload";
  collection: PublishCollectionMutation_publishCollection_collection;
}

export interface PublishCollectionMutation {
  publishCollection: PublishCollectionMutation_publishCollection | null;
}

export interface PublishCollectionMutationVariables {
  id: string;
  regenerate?: boolean | null;
}
