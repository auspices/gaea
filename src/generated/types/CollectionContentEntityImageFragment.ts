/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentEntityImageFragment
// ====================================================

export interface CollectionContentEntityImageFragment_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentEntityImageFragment_thumbnail {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentEntityImageFragment_thumbnail_urls;
}

export interface CollectionContentEntityImageFragment {
  __typename: "Image";
  id: number;
  title: string;
  thumbnail: CollectionContentEntityImageFragment_thumbnail;
}
