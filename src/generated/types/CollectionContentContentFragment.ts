/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentContentFragment
// ====================================================

export interface CollectionContentContentFragment_entity_Image_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentContentFragment_entity_Image_thumbnail {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentContentFragment_entity_Image_thumbnail_urls;
}

export interface CollectionContentContentFragment_entity_Image {
  __typename: "Image";
  label: string;
  width: number;
  height: number;
  id: number;
  title: string;
  thumbnail: CollectionContentContentFragment_entity_Image_thumbnail;
}

export interface CollectionContentContentFragment_entity_Text {
  __typename: "Text";
  label: string;
  id: number;
  blurb: string;
}

export interface CollectionContentContentFragment_entity_Link {
  __typename: "Link";
  label: string;
  id: number;
  url: string;
  name: string;
}

export interface CollectionContentContentFragment_entity_Collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentContentFragment_entity_Collection {
  __typename: "Collection";
  label: string;
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
  name: string;
  counts: CollectionContentContentFragment_entity_Collection_counts;
}

export interface CollectionContentContentFragment_entity_Attachment {
  __typename: "Attachment";
  label: string;
  id: number;
  url: string;
  fileSize: string | null;
  contentType: string;
}

export type CollectionContentContentFragment_entity = CollectionContentContentFragment_entity_Image | CollectionContentContentFragment_entity_Text | CollectionContentContentFragment_entity_Link | CollectionContentContentFragment_entity_Collection | CollectionContentContentFragment_entity_Attachment;

export interface CollectionContentContentFragment {
  __typename: "Content";
  id: number;
  position: number;
  entity: CollectionContentContentFragment_entity;
}
