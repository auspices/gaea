/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SampleCollectionContentQuery
// ====================================================

export interface SampleCollectionContentQuery_me_collection_contents {
  __typename: "Content";
  id: number;
}

export interface SampleCollectionContentQuery_me_collection {
  __typename: "Collection";
  id: number;
  contents: SampleCollectionContentQuery_me_collection_contents[];
}

export interface SampleCollectionContentQuery_me {
  __typename: "User";
  id: number;
  slug: string;
  collection: SampleCollectionContentQuery_me_collection;
}

export interface SampleCollectionContentQuery {
  me: SampleCollectionContentQuery_me;
}

export interface SampleCollectionContentQueryVariables {
  id: string;
}
