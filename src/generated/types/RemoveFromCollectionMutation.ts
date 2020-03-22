/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromCollectionMutation
// ====================================================

export interface RemoveFromCollectionMutation_removeFromCollection_collection {
  __typename: 'Collection'
  id: number
}

export interface RemoveFromCollectionMutation_removeFromCollection {
  __typename: 'RemoveFromCollectionPayload'
  collection: RemoveFromCollectionMutation_removeFromCollection_collection
}

export interface RemoveFromCollectionMutation {
  removeFromCollection: RemoveFromCollectionMutation_removeFromCollection | null
}

export interface RemoveFromCollectionMutationVariables {
  contentId: string
}
