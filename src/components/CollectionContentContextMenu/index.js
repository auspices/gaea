import React, { Children, useCallback, useRef, useState } from 'react'

import styled from 'styled-components'

import { Box } from '../../components/UI/Box'
import { Overlay } from '../../components/UI/Overlay'
import { Icons } from '../../components/UI/Icons'

const Toggle = styled.div.attrs({
  role: 'button',
  tabIndex: 0,
})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  padding: 0.0625em 0.5em;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
  }

  &:focus,
  &:hover {
    background-color: white;
  }
`

const Contents = styled(Box)`
  background-color: white;
  border-radius: 4px;
  width: 10em;
  overflow: hidden;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.25);
`

const Option = styled(Box)`
  > * {
    display: block;
    width: 100%;
    padding: 0.25em 0.5em;
    text-align: left;

    &:hover {
      text-decoration: none;
      background-color: lightgray;
    }
  }
`

export const CollectionContentContextMenu = ({ children, ...rest }) => {
  const [mode, setMode] = useState('resting')
  const targetEl = useRef(null)

  const handleClick = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setMode('open')
  }, [])

  const handleClose = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setMode('resting')
  }, [])

  return (
    <Box {...rest}>
      <Toggle onClick={handleClick} ref={targetEl}>
        <Icons name="Ellipsis" color="black" size="1.25em" />
      </Toggle>

      {mode === 'open' && (
        <Overlay
          offsetY={4}
          alignToX="left"
          anchorX="left"
          disableTarget
          onClose={handleClose}
          targetEl={() => targetEl.current}
        >
          <Contents>
            {Children.map(children, child => child && <Option>{child}</Option>)}
          </Contents>
        </Overlay>
      )}
    </Box>
  )
}
