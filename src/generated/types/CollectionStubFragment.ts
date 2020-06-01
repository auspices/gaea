/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionStubFragment
// ====================================================

export interface CollectionStubFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionStubFragment_within {
  __typename: "Collection";
  id: number;
  title: string;
}

export interface CollectionStubFragment {
  __typename: "Collection";
  id: number;
  slug: string;
  key: string | null;
  title: string;
  updatedAt: string;
  counts: CollectionStubFragment_counts;
  within: CollectionStubFragment_within[];
}
