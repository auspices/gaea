/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedUpload } from "./globalTypes";

// ====================================================
// GraphQL query operation: FilesUploaderQuery
// ====================================================

export interface FilesUploaderQuery_me {
  __typename: "User";
  id: number;
  presignedUploadUrls: string[];
}

export interface FilesUploaderQuery {
  /**
   * The logged in current user  
   */
  me: FilesUploaderQuery_me;
}

export interface FilesUploaderQueryVariables {
  fileTypes: SupportedUpload[];
}
