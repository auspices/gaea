/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentCollectionFragment
// ====================================================

export interface CollectionContentCollectionFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentCollectionFragment {
  __typename: "Collection";
  id: number;
  counts: CollectionContentCollectionFragment_counts;
}
