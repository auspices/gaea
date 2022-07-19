/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentsListFragment
// ====================================================

export interface CollectionContentsListFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentsListFragment_contents_entity_Image_placeholder_urls {
  __typename: "RetinaImage";
  src: string;
}

export interface CollectionContentsListFragment_contents_entity_Image_placeholder {
  __typename: "ResizedImage";
  urls: CollectionContentsListFragment_contents_entity_Image_placeholder_urls;
}

export interface CollectionContentsListFragment_contents_entity_Image_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentsListFragment_contents_entity_Image_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentsListFragment_contents_entity_Image_resized_urls;
}

export interface CollectionContentsListFragment_contents_entity_Image {
  __typename: "Image";
  id: number;
  title: string;
  url: string;
  placeholder: CollectionContentsListFragment_contents_entity_Image_placeholder;
  resized: CollectionContentsListFragment_contents_entity_Image_resized;
}

export interface CollectionContentsListFragment_contents_entity_Text {
  __typename: "Text";
  id: number;
  body: string;
}

export interface CollectionContentsListFragment_contents_entity_Link {
  __typename: "Link";
  id: number;
  url: string;
}

export interface CollectionContentsListFragment_contents_entity_Collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentsListFragment_contents_entity_Collection {
  __typename: "Collection";
  id: number;
  title: string;
  slug: string;
  updatedAt: string;
  counts: CollectionContentsListFragment_contents_entity_Collection_counts;
}

export interface CollectionContentsListFragment_contents_entity_Attachment {
  __typename: "Attachment";
  id: number;
  url: string;
  name: string;
  fileSize: string | null;
  contentType: string;
}

export type CollectionContentsListFragment_contents_entity = CollectionContentsListFragment_contents_entity_Image | CollectionContentsListFragment_contents_entity_Text | CollectionContentsListFragment_contents_entity_Link | CollectionContentsListFragment_contents_entity_Collection | CollectionContentsListFragment_contents_entity_Attachment;

export interface CollectionContentsListFragment_contents {
  __typename: "Content";
  id: number;
  position: number;
  entity: CollectionContentsListFragment_contents_entity;
}

export interface CollectionContentsListFragment {
  __typename: "Collection";
  id: number;
  counts: CollectionContentsListFragment_counts;
  contents: CollectionContentsListFragment_contents[];
}
