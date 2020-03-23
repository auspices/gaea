/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ContentSettingsMutation
// ====================================================

export interface ContentSettingsMutation_updateContent_content {
  __typename: "Content";
  id: number;
  metadata: any;
}

export interface ContentSettingsMutation_updateContent {
  __typename: "UpdateContentPayload";
  content: ContentSettingsMutation_updateContent_content;
}

export interface ContentSettingsMutation {
  updateContent: ContentSettingsMutation_updateContent | null;
}

export interface ContentSettingsMutationVariables {
  id: string;
  metadata?: any | null;
}
