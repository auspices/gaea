/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentEntityImageFragment
// ====================================================

export interface ContentEntityImageFragment_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ContentEntityImageFragment_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: ContentEntityImageFragment_resized_urls;
}

export interface ContentEntityImageFragment {
  __typename: "Image";
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  resized: ContentEntityImageFragment_resized;
}
