/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContentPageQuery
// ====================================================

export interface ContentPageQuery_me_content_collection {
  __typename: "Collection";
  id: number;
  slug: string;
  title: string;
}

export interface ContentPageQuery_me_content_entity_Image_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface ContentPageQuery_me_content_entity_Image_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: ContentPageQuery_me_content_entity_Image_resized_urls;
}

export interface ContentPageQuery_me_content_entity_Image {
  __typename: "Image";
  id: number;
  url: string;
  width: number;
  height: number;
  name: string;
  title: string;
  resized: ContentPageQuery_me_content_entity_Image_resized;
}

export interface ContentPageQuery_me_content_entity_Text {
  __typename: "Text";
  id: number;
  body: string;
  name: string;
}

export interface ContentPageQuery_me_content_entity_Link {
  __typename: "Link";
  id: number;
  url: string;
  name: string;
}

export type ContentPageQuery_me_content_entity = ContentPageQuery_me_content_entity_Image | ContentPageQuery_me_content_entity_Text | ContentPageQuery_me_content_entity_Link;

export interface ContentPageQuery_me_content_next {
  __typename: "Content";
  id: number;
}

export interface ContentPageQuery_me_content_previous {
  __typename: "Content";
  id: number;
}

export interface ContentPageQuery_me_content {
  __typename: "Content";
  id: number;
  collection: ContentPageQuery_me_content_collection;
  entity: ContentPageQuery_me_content_entity;
  next: ContentPageQuery_me_content_next | null;
  previous: ContentPageQuery_me_content_previous | null;
  metadata: any;
}

export interface ContentPageQuery_me {
  __typename: "User";
  id: number;
  slug: string;
  username: string;
  content: ContentPageQuery_me_content;
}

export interface ContentPageQuery {
  me: ContentPageQuery_me;
}

export interface ContentPageQueryVariables {
  id: string;
}
