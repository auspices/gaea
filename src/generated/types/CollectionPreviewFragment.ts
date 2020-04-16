/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionPreviewFragment
// ====================================================

export interface CollectionPreviewFragment_contents_entity_Image_placeholder_urls {
  __typename: "RetinaImage";
  src: string;
}

export interface CollectionPreviewFragment_contents_entity_Image_placeholder {
  __typename: "ResizedImage";
  urls: CollectionPreviewFragment_contents_entity_Image_placeholder_urls;
}

export interface CollectionPreviewFragment_contents_entity_Image {
  __typename: "Image";
  id: number;
  width: number;
  height: number;
  placeholder: CollectionPreviewFragment_contents_entity_Image_placeholder;
}

export interface CollectionPreviewFragment_contents_entity_Text {
  __typename: "Text";
  id: number;
  length: number;
}

export interface CollectionPreviewFragment_contents_entity_Link {
  __typename: "Link";
  id: number;
}

export interface CollectionPreviewFragment_contents_entity_Collection {
  __typename: "Collection";
  id: number;
}

export type CollectionPreviewFragment_contents_entity = CollectionPreviewFragment_contents_entity_Image | CollectionPreviewFragment_contents_entity_Text | CollectionPreviewFragment_contents_entity_Link | CollectionPreviewFragment_contents_entity_Collection;

export interface CollectionPreviewFragment_contents {
  __typename: "Content";
  id: number;
  entity: CollectionPreviewFragment_contents_entity;
}

export interface CollectionPreviewFragment {
  __typename: "Collection";
  id: number;
  contents: CollectionPreviewFragment_contents[];
}
