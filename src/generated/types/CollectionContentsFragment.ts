/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentsFragment
// ====================================================

export interface CollectionContentsFragment_contents_entity_Image_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentsFragment_contents_entity_Image_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentsFragment_contents_entity_Image_resized_urls;
}

export interface CollectionContentsFragment_contents_entity_Image {
  __typename: "Image";
  label: string;
  width: number;
  height: number;
  id: number;
  title: string;
  resized: CollectionContentsFragment_contents_entity_Image_resized;
}

export interface CollectionContentsFragment_contents_entity_Text {
  __typename: "Text";
  label: string;
  id: number;
  body: string;
}

export interface CollectionContentsFragment_contents_entity_Link {
  __typename: "Link";
  label: string;
  id: number;
  url: string;
  name: string;
}

export interface CollectionContentsFragment_contents_entity_Collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentsFragment_contents_entity_Collection {
  __typename: "Collection";
  label: string;
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
  name: string;
  counts: CollectionContentsFragment_contents_entity_Collection_counts;
}

export type CollectionContentsFragment_contents_entity = CollectionContentsFragment_contents_entity_Image | CollectionContentsFragment_contents_entity_Text | CollectionContentsFragment_contents_entity_Link | CollectionContentsFragment_contents_entity_Collection;

export interface CollectionContentsFragment_contents {
  __typename: "Content";
  id: number;
  entity: CollectionContentsFragment_contents_entity;
}

export interface CollectionContentsFragment {
  __typename: "Collection";
  id: number;
  contents: CollectionContentsFragment_contents[];
}
