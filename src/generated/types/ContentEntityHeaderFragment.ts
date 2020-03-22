/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentEntityHeaderFragment
// ====================================================

export interface ContentEntityHeaderFragment_Image {
  __typename: 'Image'
  id: number
  url: string
  width: number
  height: number
}

export interface ContentEntityHeaderFragment_Text {
  __typename: 'Text'
  id: number
  body: string
}

export interface ContentEntityHeaderFragment_Link {
  __typename: 'Link'
  id: number
  name: string
  url: string
}

export type ContentEntityHeaderFragment =
  | ContentEntityHeaderFragment_Image
  | ContentEntityHeaderFragment_Text
  | ContentEntityHeaderFragment_Link
