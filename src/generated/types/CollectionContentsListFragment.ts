/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentsListFragment
// ====================================================

export interface CollectionContentsListFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentsListFragment_contents_entity {
  __typename: "Collection" | "Image" | "Link" | "Text";
}

export interface CollectionContentsListFragment_contents {
  __typename: "Content";
  id: number;
  position: number;
  entity: CollectionContentsListFragment_contents_entity;
}

export interface CollectionContentsListFragment {
  __typename: "Collection";
  id: number;
  counts: CollectionContentsListFragment_counts;
  contents: CollectionContentsListFragment_contents[];
}
