/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntityTypes } from './globalTypes'

// ====================================================
// GraphQL mutation operation: UpdateContentEntityTextMutation
// ====================================================

export interface UpdateContentEntityTextMutation_updateEntity_entity {
  __typename: 'Image' | 'Text' | 'Link'
}

export interface UpdateContentEntityTextMutation_updateEntity {
  __typename: 'UpdateEntityPayload'
  entity: UpdateContentEntityTextMutation_updateEntity_entity
}

export interface UpdateContentEntityTextMutation {
  updateEntity: UpdateContentEntityTextMutation_updateEntity | null
}

export interface UpdateContentEntityTextMutationVariables {
  id: string
  type: EntityTypes
  value: string
}
