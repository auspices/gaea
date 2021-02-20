/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentContextMenuCollectionFragment
// ====================================================

export interface CollectionContentContextMenuCollectionFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentContextMenuCollectionFragment {
  __typename: "Collection";
  id: number;
  counts: CollectionContentContextMenuCollectionFragment_counts;
}
