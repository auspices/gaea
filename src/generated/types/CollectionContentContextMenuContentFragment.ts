/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionContentContextMenuContentFragment
// ====================================================

export interface CollectionContentContextMenuContentFragment_entity {
  __typename: "Collection" | "Image" | "Link" | "Text";
}

export interface CollectionContentContextMenuContentFragment {
  __typename: "Content";
  id: number;
  position: number;
  entity: CollectionContentContextMenuContentFragment_entity;
}
