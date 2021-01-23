/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CapturePageCollectionsQuery
// ====================================================

export interface CapturePageCollectionsQuery_me_collections {
  __typename: "Collection";
  id: number;
  name: string;
  href: string;
}

export interface CapturePageCollectionsQuery_me {
  __typename: "User";
  collections: CapturePageCollectionsQuery_me_collections[];
}

export interface CapturePageCollectionsQuery {
  /**
   * The logged in current user  
   */
  me: CapturePageCollectionsQuery_me;
}
