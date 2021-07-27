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
  blurb: string;
}

export interface CollectionContentEntityFragment_Image_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentEntityFragment_Image_thumbnail {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentEntityFragment_Image_thumbnail_urls;
}

export interface CollectionContentEntityFragment_Image {
  __typename: "Image";
  id: number;
  title: string;
  thumbnail: CollectionContentEntityFragment_Image_thumbnail;
}

export interface CollectionContentEntityFragment_Link {
  __typename: "Link";
  id: number;
  url: string;
  name: string;
}

export interface CollectionContentEntityFragment_Collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentEntityFragment_Collection {
  __typename: "Collection";
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
  name: string;
  counts: CollectionContentEntityFragment_Collection_counts;
}

export interface CollectionContentEntityFragment_Attachment {
  __typename: "Attachment";
  id: number;
  url: string;
  fileSize: string;
  contentType: string;
}

export type CollectionContentEntityFragment = CollectionContentEntityFragment_Text | CollectionContentEntityFragment_Image | CollectionContentEntityFragment_Link | CollectionContentEntityFragment_Collection | CollectionContentEntityFragment_Attachment;
