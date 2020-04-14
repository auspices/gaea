/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AddToCollectionExtendedSearchQuery
// ====================================================

export interface AddToCollectionExtendedSearchQuery_filtered_collections {
  __typename: "Collection";
  id: number;
  slug: string;
  name: string;
}

export interface AddToCollectionExtendedSearchQuery_filtered {
  __typename: "User";
  id: number;
  collections: AddToCollectionExtendedSearchQuery_filtered_collections[];
}

export interface AddToCollectionExtendedSearchQuery {
  filtered: AddToCollectionExtendedSearchQuery_filtered;
}

export interface AddToCollectionExtendedSearchQueryVariables {
  query: string;
}
