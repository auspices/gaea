/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FilteredCollectionStubListQuery
// ====================================================

export interface FilteredCollectionStubListQuery_filtered_collections_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface FilteredCollectionStubListQuery_filtered_collections {
  __typename: "Collection";
  id: number;
  slug: string;
  key: string | null;
  title: string;
  updatedAt: string;
  counts: FilteredCollectionStubListQuery_filtered_collections_counts;
}

export interface FilteredCollectionStubListQuery_filtered {
  __typename: "User";
  id: number;
  collections: FilteredCollectionStubListQuery_filtered_collections[];
}

export interface FilteredCollectionStubListQuery {
  /**
   * The logged in current user  
   */
  filtered: FilteredCollectionStubListQuery_filtered;
}

export interface FilteredCollectionStubListQueryVariables {
  query: string;
}
