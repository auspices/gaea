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

export interface CollectionPageQuery_me_collection_contents_entity_Text {
  __typename: "Text";
  id: number;
  body: string;
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
  id: number;
  title: string;
  resized: CollectionPageQuery_me_collection_contents_entity_Image_resized;
}

export interface CollectionPageQuery_me_collection_contents_entity_Link {
  __typename: "Link";
  id: number;
  url: string;
  name: string;
}

export type CollectionPageQuery_me_collection_contents_entity = CollectionPageQuery_me_collection_contents_entity_Text | CollectionPageQuery_me_collection_contents_entity_Image | CollectionPageQuery_me_collection_contents_entity_Link;

export interface CollectionPageQuery_me_collection_contents {
  __typename: "Content";
  id: number;
  entity: CollectionPageQuery_me_collection_contents_entity;
}

export interface CollectionPageQuery_me_collection {
  __typename: "Collection";
  id: number;
  slug: string;
  title: string;
  counts: CollectionPageQuery_me_collection_counts;
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
  me: CollectionPageQuery_me;
}

export interface CollectionPageQueryVariables {
  id: string;
  page?: number | null;
  per?: number | null;
}
