/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentEntityCollectionFragment
// ====================================================

export interface CollectionContentEntityCollectionFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentEntityCollectionFragment {
  __typename: "Collection";
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
  name: string;
  counts: CollectionContentEntityCollectionFragment_counts;
}
