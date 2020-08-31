/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionSettingsPageQuery
// ====================================================

export interface CollectionSettingsPageQuery_me_collection {
  __typename: "Collection";
  id: number;
  slug: string;
  title: string;
}

export interface CollectionSettingsPageQuery_me {
  __typename: "User";
  id: number;
  slug: string;
  username: string;
  collection: CollectionSettingsPageQuery_me_collection;
}

export interface CollectionSettingsPageQuery {
  /**
   * The logged in current user  
   */
  me: CollectionSettingsPageQuery_me;
}

export interface CollectionSettingsPageQueryVariables {
  id: string;
}
