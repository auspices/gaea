/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionsPageQuery
// ====================================================

export interface CollectionsPageQuery_me_counts {
  __typename: "UserCounts";
  collections: number;
}

export interface CollectionsPageQuery_me_collections_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionsPageQuery_me_collections_within {
  __typename: "Collection";
  id: number;
  title: string;
}

export interface CollectionsPageQuery_me_collections {
  __typename: "Collection";
  id: number;
  slug: string;
  key: string | null;
  title: string;
  updatedAt: string;
  counts: CollectionsPageQuery_me_collections_counts;
  within: CollectionsPageQuery_me_collections_within[];
}

export interface CollectionsPageQuery_me {
  __typename: "User";
  id: number;
  slug: string;
  username: string;
  counts: CollectionsPageQuery_me_counts;
  collections: CollectionsPageQuery_me_collections[];
}

export interface CollectionsPageQuery {
  /**
   * The logged in current user  
   */
  me: CollectionsPageQuery_me;
}

export interface CollectionsPageQueryVariables {
  page?: number | null;
  per?: number | null;
}
