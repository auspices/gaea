/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionStubListFragment
// ====================================================

export interface CollectionStubListFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionStubListFragment_within {
  __typename: "Collection";
  id: number;
  title: string;
}

export interface CollectionStubListFragment {
  __typename: "Collection";
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
  counts: CollectionStubListFragment_counts;
  within: CollectionStubListFragment_within[];
}
