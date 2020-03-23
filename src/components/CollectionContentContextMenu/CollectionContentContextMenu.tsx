import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  BoxProps,
  Pane,
  PaneOption,
  paneShadowMixin,
  Popper,
} from '@auspices/eos'
import { Icons } from '../Icons'

const Toggle = styled(PaneOption).attrs({ borderRadius: 4, px: 3, py: 1 })`
  ${paneShadowMixin}
`

enum Mode {
  Resting,
  Open,
}

type CollectionContentContextMenuProps = BoxProps & {
  children: React.ReactElement<any> | React.ReactElement<any>[]
}

export const CollectionContentContextMenu: React.FC<CollectionContentContextMenuProps> = ({
  children,
  ...rest
}) => {
  const [mode, setMode] = useState(Mode.Resting)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      event.stopPropagation()
      setMode(Mode.Open)
    },
    []
  )

  const handleClose = useCallback(() => setMode(Mode.Resting), [])

  return (
    <Box zIndex={1} {...rest}>
      <Popper
        open={mode === Mode.Open}
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
