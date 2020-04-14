/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentEntityCollectionFragment
// ====================================================

export interface ContentEntityCollectionFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface ContentEntityCollectionFragment {
  __typename: "Collection";
  id: number;
  title: string;
  slug: string;
  updatedAt: string;
  counts: ContentEntityCollectionFragment_counts;
}
