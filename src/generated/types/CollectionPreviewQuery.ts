/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionPreviewQuery
// ====================================================

export interface CollectionPreviewQuery_me_collection_contents_entity_Image_placeholder_urls {
  __typename: "RetinaImage";
  src: string;
}

export interface CollectionPreviewQuery_me_collection_contents_entity_Image_placeholder {
  __typename: "ResizedImage";
  urls: CollectionPreviewQuery_me_collection_contents_entity_Image_placeholder_urls;
}

export interface CollectionPreviewQuery_me_collection_contents_entity_Image {
  __typename: "Image";
  id: number;
  width: number;
  height: number;
  placeholder: CollectionPreviewQuery_me_collection_contents_entity_Image_placeholder;
}

export interface CollectionPreviewQuery_me_collection_contents_entity_Text {
  __typename: "Text";
  id: number;
  length: number;
}

export interface CollectionPreviewQuery_me_collection_contents_entity_Link {
  __typename: "Link";
  id: number;
}

export interface CollectionPreviewQuery_me_collection_contents_entity_Collection {
  __typename: "Collection";
  id: number;
}

export type CollectionPreviewQuery_me_collection_contents_entity = CollectionPreviewQuery_me_collection_contents_entity_Image | CollectionPreviewQuery_me_collection_contents_entity_Text | CollectionPreviewQuery_me_collection_contents_entity_Link | CollectionPreviewQuery_me_collection_contents_entity_Collection;

export interface CollectionPreviewQuery_me_collection_contents {
  __typename: "Content";
  id: number;
  entity: CollectionPreviewQuery_me_collection_contents_entity;
}

export interface CollectionPreviewQuery_me_collection {
  __typename: "Collection";
  id: number;
  contents: CollectionPreviewQuery_me_collection_contents[];
}

export interface CollectionPreviewQuery_me {
  __typename: "User";
  id: number;
  collection: CollectionPreviewQuery_me_collection;
}

export interface CollectionPreviewQuery {
  /**
   * The logged in current user  
   */
  me: CollectionPreviewQuery_me;
}

export interface CollectionPreviewQueryVariables {
  id: string;
  per?: number | null;
}
