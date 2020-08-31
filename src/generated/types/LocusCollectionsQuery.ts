/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LocusCollectionsQuery
// ====================================================

export interface LocusCollectionsQuery_filtered_collections {
  __typename: "Collection";
  id: number;
  slug: string;
  title: string;
}

export interface LocusCollectionsQuery_filtered {
  __typename: "User";
  id: number;
  collections: LocusCollectionsQuery_filtered_collections[];
}

export interface LocusCollectionsQuery {
  /**
   * The logged in current user  
   */
  filtered: LocusCollectionsQuery_filtered;
}

export interface LocusCollectionsQueryVariables {
  query: string;
}
