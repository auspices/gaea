/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnpublishCollectionMutation
// ====================================================

export interface UnpublishCollectionMutation_unpublishCollection_collection {
  __typename: "Collection";
  id: number;
  key: string | null;
}

export interface UnpublishCollectionMutation_unpublishCollection {
  __typename: "UnpublishCollectionPayload";
  collection: UnpublishCollectionMutation_unpublishCollection_collection;
}

export interface UnpublishCollectionMutation {
  unpublishCollection: UnpublishCollectionMutation_unpublishCollection | null;
}

export interface UnpublishCollectionMutationVariables {
  id: string;
}
