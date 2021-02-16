/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentsListFragment
// ====================================================

export interface CollectionContentsListFragment_contents {
  __typename: "Content";
  id: number;
}

export interface CollectionContentsListFragment {
  __typename: "Collection";
  id: number;
  contents: CollectionContentsListFragment_contents[];
}
