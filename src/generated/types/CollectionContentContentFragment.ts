/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentContentFragment
// ====================================================

export interface CollectionContentContentFragment_entity_Image_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentContentFragment_entity_Image_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentContentFragment_entity_Image_resized_urls;
}

export interface CollectionContentContentFragment_entity_Image {
  __typename: "Image";
  label: string;
  width: number;
  height: number;
  id: number;
  title: string;
  resized: CollectionContentContentFragment_entity_Image_resized;
}

export interface CollectionContentContentFragment_entity_Text {
  __typename: "Text";
  label: string;
  id: number;
  body: string;
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

export type CollectionContentContentFragment_entity = CollectionContentContentFragment_entity_Image | CollectionContentContentFragment_entity_Text | CollectionContentContentFragment_entity_Link | CollectionContentContentFragment_entity_Collection;

export interface CollectionContentContentFragment {
  __typename: "Content";
  id: number;
  position: number;
  entity: CollectionContentContentFragment_entity;
}
