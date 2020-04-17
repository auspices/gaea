import React, { useCallback } from 'react'
import styled from 'styled-components'
import {
  Box,
  BoxProps,
  Ellipsis,
  Pane,
  PaneOption,
  paneShadowMixin,
  Popper,
} from '@auspices/eos'
import { useActive } from '../../hooks'
import { Z } from '../../util/zIndexes'

export const ContextMenuToggle = styled(PaneOption).attrs({
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
  const { mode, setMode, Mode } = useActive()

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      event.stopPropagation()
      setMode(Mode.Active)
      onOpen && onOpen()
    },
    [Mode.Active, onOpen, setMode]
  )

  const handleClose = useCallback(() => {
    setMode(Mode.Resting)
    onClose && onClose()
  }, [Mode.Resting, onClose, setMode])

  return (
    <Box zIndex={Z.DROPDOWN} {...rest}>
      <Popper
        open={mode === Mode.Active}
        onClose={handleClose}
        anchor={
          <ContextMenuToggle onClick={handleClick}>
            <Ellipsis />
          </ContextMenuToggle>
        }
      >
        <Pane>{children}</Pane>
      </Popper>
    </Box>
  )
}
