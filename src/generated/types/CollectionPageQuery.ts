/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionPageQuery
// ====================================================

export interface CollectionPageQuery_me_collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionPageQuery_me_collection_within {
  __typename: "Collection";
  id: number;
  slug: string;
  title: string;
}

export interface CollectionPageQuery_me_collection_contents_entity_Image_thumbnail_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionPageQuery_me_collection_contents_entity_Image_thumbnail {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionPageQuery_me_collection_contents_entity_Image_thumbnail_urls;
}

export interface CollectionPageQuery_me_collection_contents_entity_Image_placeholder_urls {
  __typename: "RetinaImage";
  src: string;
}

export interface CollectionPageQuery_me_collection_contents_entity_Image_placeholder {
  __typename: "ResizedImage";
  urls: CollectionPageQuery_me_collection_contents_entity_Image_placeholder_urls;
}

export interface CollectionPageQuery_me_collection_contents_entity_Image_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionPageQuery_me_collection_contents_entity_Image_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionPageQuery_me_collection_contents_entity_Image_resized_urls;
}

export interface CollectionPageQuery_me_collection_contents_entity_Image {
  __typename: "Image";
  label: string;
  width: number;
  height: number;
  id: number;
  title: string;
  thumbnail: CollectionPageQuery_me_collection_contents_entity_Image_thumbnail;
  url: string;
  placeholder: CollectionPageQuery_me_collection_contents_entity_Image_placeholder;
  resized: CollectionPageQuery_me_collection_contents_entity_Image_resized;
}

export interface CollectionPageQuery_me_collection_contents_entity_Text {
  __typename: "Text";
  label: string;
  id: number;
  blurb: string;
  body: string;
}

export interface CollectionPageQuery_me_collection_contents_entity_Link {
  __typename: "Link";
  label: string;
  id: number;
  url: string;
  name: string;
}

export interface CollectionPageQuery_me_collection_contents_entity_Collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionPageQuery_me_collection_contents_entity_Collection {
  __typename: "Collection";
  label: string;
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
  name: string;
  counts: CollectionPageQuery_me_collection_contents_entity_Collection_counts;
}

export interface CollectionPageQuery_me_collection_contents_entity_Attachment {
  __typename: "Attachment";
  label: string;
  id: number;
  url: string;
  fileSize: string;
  contentType: string;
  name: string;
}

export type CollectionPageQuery_me_collection_contents_entity = CollectionPageQuery_me_collection_contents_entity_Image | CollectionPageQuery_me_collection_contents_entity_Text | CollectionPageQuery_me_collection_contents_entity_Link | CollectionPageQuery_me_collection_contents_entity_Collection | CollectionPageQuery_me_collection_contents_entity_Attachment;

export interface CollectionPageQuery_me_collection_contents {
  __typename: "Content";
  id: number;
  position: number;
  entity: CollectionPageQuery_me_collection_contents_entity;
}

export interface CollectionPageQuery_me_collection {
  __typename: "Collection";
  id: number;
  slug: string;
  key: string | null;
  title: string;
  updatedAt: string;
  counts: CollectionPageQuery_me_collection_counts;
  within: CollectionPageQuery_me_collection_within[];
  contents: CollectionPageQuery_me_collection_contents[];
  metadata: any;
}

export interface CollectionPageQuery_me {
  __typename: "User";
  id: number;
  slug: string;
  username: string;
  collection: CollectionPageQuery_me_collection;
}

export interface CollectionPageQuery {
  /**
   * The logged in current user  
   */
  me: CollectionPageQuery_me;
}

export interface CollectionPageQueryVariables {
  id: string;
  page?: number | null;
  per?: number | null;
}
