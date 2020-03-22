/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReorderAction } from './globalTypes'

// ====================================================
// GraphQL mutation operation: RepositionCollectionContentMutation
// ====================================================

export interface RepositionCollectionContentMutation_repositionCollectionContent_collection {
  __typename: 'Collection'
  id: number
}

export interface RepositionCollectionContentMutation_repositionCollectionContent {
  __typename: 'RepositionCollectionContentPayload'
  collection: RepositionCollectionContentMutation_repositionCollectionContent_collection
}

export interface RepositionCollectionContentMutation {
  repositionCollectionContent: RepositionCollectionContentMutation_repositionCollectionContent | null
}

export interface RepositionCollectionContentMutationVariables {
  contentId: string
  action: ReorderAction
}
