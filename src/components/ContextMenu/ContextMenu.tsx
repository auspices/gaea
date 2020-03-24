import React, { useCallback } from 'react'
import styled from 'styled-components'
import {
  Box,
  BoxProps,
  Pane,
  PaneOption,
  paneShadowMixin,
  Popper,
} from '@auspices/eos'
import { useActive } from '../../hooks'
import { Icons } from '../Icons'

const Toggle = styled(PaneOption).attrs({ borderRadius: 4, px: 3, py: 1 })`
  ${paneShadowMixin}
`

type ContextMenuProps = BoxProps & {
  children: React.ReactElement<any> | React.ReactElement<any>[]
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  ...rest
}) => {
  const { mode, setMode, Mode } = useActive()

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      event.stopPropagation()
      setMode(Mode.Active)
    },
    [Mode.Active, setMode]
  )

  const handleClose = useCallback(() => setMode(Mode.Resting), [
    Mode.Resting,
    setMode,
  ])

  return (
    <Box zIndex={1} {...rest}>
      <Popper
        open={mode === Mode.Active}
        onClose={handleClose}
        anchor={
          <Toggle onClick={handleClick} backgroundColor="background">
            <Icons name="Ellipsis" />
          </Toggle>
        }
      >
        <Pane>{children}</Pane>
      </Popper>
    </Box>
  )
}
