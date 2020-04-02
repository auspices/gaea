/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentEntityImageFragment
// ====================================================

export interface ContentEntityImageFragment_placeholder_urls {
  __typename: "RetinaImage";
  src: string;
}

export interface ContentEntityImageFragment_placeholder {
  __typename: "ResizedImage";
  urls: ContentEntityImageFragment_placeholder_urls;
}

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
  placeholder: ContentEntityImageFragment_placeholder;
  resized: ContentEntityImageFragment_resized;
}
