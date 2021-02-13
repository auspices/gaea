import React from 'react'
import styled from 'styled-components'
import {
  Box,
  BoxProps,
  Dropdown,
  Ellipsis,
  PaneOption,
  paneShadowMixin,
} from '@auspices/eos'
import { Z } from '../../util/zIndexes'

export const Toggle = styled(PaneOption).attrs({
  borderRadius: 4,
  px: 3,
  py: 3,
  border: '1px solid',
  borderColor: 'background',
  backgroundColor: 'background',
})`
  display: block;
  ${paneShadowMixin}
`

type ContextMenuProps = BoxProps & {
  children: React.ReactElement<any> | React.ReactElement<any>[]
  onOpen?(): void
  onClose?(): void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  onOpen,
  onClose,
  ...rest
}) => {
  return (
    <Box zIndex={Z.DROPDOWN} {...rest}>
      <Dropdown
        onOpen={onOpen}
        onClose={onClose}
        label={
          <Toggle>
            <Ellipsis />
          </Toggle>
        }
      >
        {children}
      </Dropdown>
    </Box>
  )
}
