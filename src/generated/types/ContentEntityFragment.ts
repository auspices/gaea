/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentEntityFragment
// ====================================================

export interface ContentEntityFragment_Image_resized_urls {
  __typename: 'RetinaImage'
  _1x: string
  _2x: string
}

export interface ContentEntityFragment_Image_resized {
  __typename: 'ResizedImage'
  width: number
  height: number
  urls: ContentEntityFragment_Image_resized_urls
}

export interface ContentEntityFragment_Image {
  __typename: 'Image'
  id: number
  title: string
  url: string
  width: number
  height: number
  resized: ContentEntityFragment_Image_resized
}

export interface ContentEntityFragment_Text {
  __typename: 'Text'
  id: number
  body: string
}

export interface ContentEntityFragment_Link {
  __typename: 'Link'
  id: number
  url: string
}

export type ContentEntityFragment =
  | ContentEntityFragment_Image
  | ContentEntityFragment_Text
  | ContentEntityFragment_Link
