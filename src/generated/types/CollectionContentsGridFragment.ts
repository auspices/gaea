/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentsGridFragment
// ====================================================

export interface CollectionContentsGridFragment_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentsGridFragment_contents_entity_Image_resized_urls {
  __typename: "RetinaImage";
  _1x: string;
  _2x: string;
}

export interface CollectionContentsGridFragment_contents_entity_Image_resized {
  __typename: "ResizedImage";
  width: number;
  height: number;
  urls: CollectionContentsGridFragment_contents_entity_Image_resized_urls;
}

export interface CollectionContentsGridFragment_contents_entity_Image {
  __typename: "Image";
  label: string;
  width: number;
  height: number;
  id: number;
  title: string;
  resized: CollectionContentsGridFragment_contents_entity_Image_resized;
}

export interface CollectionContentsGridFragment_contents_entity_Text {
  __typename: "Text";
  label: string;
  id: number;
  body: string;
}

export interface CollectionContentsGridFragment_contents_entity_Link {
  __typename: "Link";
  label: string;
  id: number;
  url: string;
  name: string;
}

export interface CollectionContentsGridFragment_contents_entity_Collection_counts {
  __typename: "CollectionCounts";
  contents: number;
}

export interface CollectionContentsGridFragment_contents_entity_Collection {
  __typename: "Collection";
  label: string;
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
  name: string;
  counts: CollectionContentsGridFragment_contents_entity_Collection_counts;
}

export type CollectionContentsGridFragment_contents_entity = CollectionContentsGridFragment_contents_entity_Image | CollectionContentsGridFragment_contents_entity_Text | CollectionContentsGridFragment_contents_entity_Link | CollectionContentsGridFragment_contents_entity_Collection;

export interface CollectionContentsGridFragment_contents {
  __typename: "Content";
  id: number;
  position: number;
  entity: CollectionContentsGridFragment_contents_entity;
}

export interface CollectionContentsGridFragment {
  __typename: "Collection";
  id: number;
  counts: CollectionContentsGridFragment_counts;
  contents: CollectionContentsGridFragment_contents[];
}