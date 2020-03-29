/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpadateCollectionSettingsMutation
// ====================================================

export interface UpadateCollectionSettingsMutation_updateCollection_collection {
  __typename: "Collection";
  id: number;
  name: string;
}

export interface UpadateCollectionSettingsMutation_updateCollection {
  __typename: "UpdateCollectionPayload";
  collection: UpadateCollectionSettingsMutation_updateCollection_collection;
}

export interface UpadateCollectionSettingsMutation {
  updateCollection: UpadateCollectionSettingsMutation_updateCollection | null;
}

export interface UpadateCollectionSettingsMutationVariables {
  id: string;
  title?: string | null;
}
