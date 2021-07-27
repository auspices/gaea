/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EntityTypes {
  COLLECTION = "COLLECTION",
  IMAGE = "IMAGE",
  LINK = "LINK",
  TEXT = "TEXT",
}

export enum PlanInterval {
  DAY = "DAY",
  MONTH = "MONTH",
  WEEK = "WEEK",
  YEAR = "YEAR",
}

export enum ReorderAction {
  INSERT_AT = "INSERT_AT",
  MOVE_DOWN = "MOVE_DOWN",
  MOVE_TO_BOTTOM = "MOVE_TO_BOTTOM",
  MOVE_TO_TOP = "MOVE_TO_TOP",
  MOVE_UP = "MOVE_UP",
}

/**
 * Input needed to create an Attachment
 */
export interface AttachmentInput {
  url: string;
  fileName: string;
  fileContentType: string;
  fileContentLength: number;
}

/**
 * Input needed to create an Image
 */
export interface ImageInput {
  url: string;
}

/**
 * Input needed to create an Upload
 */
export interface UploadInput {
  name: string;
  type: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
