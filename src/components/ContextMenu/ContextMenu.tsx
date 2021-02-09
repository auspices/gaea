import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import {
  Box,
  BoxProps,
  Ellipsis,
  Pane,
  PaneOption,
  paneShadowMixin,
  usePopper,
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

  const handleOpen = useCallback(
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

  const { anchorRef, childrenRef, open } = usePopper({
    open: mode === Mode.Active,
    placement: 'bottom',
    type: 'mousedown',
    onClose: handleClose,
  })

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'Escape':
          handleClose()
          break
        default:
          break
      }
    },
    [handleClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [handleKeydown])

  return (
    <Box zIndex={Z.DROPDOWN} {...rest}>
      <ContextMenuToggle
        ref={anchorRef}
        onMouseDown={handleOpen}
        onClick={handleOpen}
        disabled={open}
      >
        <Ellipsis />
      </ContextMenuToggle>

      {open && <Pane ref={childrenRef}>{children}</Pane>}
    </Box>
  )
}
