/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToCollectionsMutation
// ====================================================

export interface AddToCollectionsMutation_addToCollections_collections {
  __typename: "Collection";
  id: number;
}

export interface AddToCollectionsMutation_addToCollections_contents {
  __typename: "Content";
  id: number;
}

export interface AddToCollectionsMutation_addToCollections {
  __typename: "AddToCollectionsPayload";
  collections: AddToCollectionsMutation_addToCollections_collections[];
  contents: AddToCollectionsMutation_addToCollections_contents[];
}

export interface AddToCollectionsMutation {
  addToCollections: AddToCollectionsMutation_addToCollections | null;
}

export interface AddToCollectionsMutationVariables {
  ids: string[];
  value: string;
  metadata?: any | null;
}
