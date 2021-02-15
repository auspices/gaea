/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentFragment
// ====================================================

export interface CollectionContentFragment_entity_Image_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentFragment_entity_Image_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentFragment_entity_Image_resized_urls;
}

export interface CollectionContentFragment_entity_Image {
  __typename: "Image";
  label: string;
  width: number;
  height: number;
  id: number;
  title: string;
  resized: CollectionContentFragment_entity_Image_resized;
}

export interface CollectionContentFragment_entity_Text {
  __typename: "Text";
  label: string;
  id: number;
  body: string;
}

export interface CollectionContentFragment_entity_Link {
  __typename: "Link";
  label: string;
  id: number;
  url: string;
  name: string;
}

export interface CollectionContentFragment_entity_Collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentFragment_entity_Collection {
  __typename: "Collection";
  label: string;
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
  name: string;
  counts: CollectionContentFragment_entity_Collection_counts;
}

export type CollectionContentFragment_entity = CollectionContentFragment_entity_Image | CollectionContentFragment_entity_Text | CollectionContentFragment_entity_Link | CollectionContentFragment_entity_Collection;

export interface CollectionContentFragment {
  __typename: "Content";
  id: number;
  position: number;
  entity: CollectionContentFragment_entity;
}
