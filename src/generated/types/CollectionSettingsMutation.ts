/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CollectionSettingsMutation
// ====================================================

export interface CollectionSettingsMutation_updateCollection_collection {
  __typename: 'Collection'
  id: number
  title: string
  metadata: any
}

export interface CollectionSettingsMutation_updateCollection {
  __typename: 'UpdateCollectionPayload'
  collection: CollectionSettingsMutation_updateCollection_collection
}

export interface CollectionSettingsMutation {
  updateCollection: CollectionSettingsMutation_updateCollection | null
}

export interface CollectionSettingsMutationVariables {
  id: string
  title?: string | null
  metadata?: any | null
}
