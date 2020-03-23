/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentEntityFragment
// ====================================================

export interface CollectionContentEntityFragment_Text {
  __typename: "Text";
  id: number;
  body: string;
}

export interface CollectionContentEntityFragment_Image_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentEntityFragment_Image_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentEntityFragment_Image_resized_urls;
}

export interface CollectionContentEntityFragment_Image {
  __typename: "Image";
  id: number;
  title: string;
  resized: CollectionContentEntityFragment_Image_resized;
}

export interface CollectionContentEntityFragment_Link {
  __typename: "Link";
  id: number;
  url: string;
  name: string;
}

export type CollectionContentEntityFragment = CollectionContentEntityFragment_Text | CollectionContentEntityFragment_Image | CollectionContentEntityFragment_Link;
