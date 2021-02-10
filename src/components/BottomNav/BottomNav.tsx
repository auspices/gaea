import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Box, BoxProps, Cell, color, themeGet } from '@auspices/eos'
import { Z } from '../../util/zIndexes'

const Container = styled(Box)`
  margin-bottom: env(safe-area-inset-bottom);

  > * {
    backdrop-filter: blur(${themeGet('space.3')});
  }

  * {
    background-color: ${color('background', 0.25)};
  }
`

export type BottomNavProps = BoxProps

export const BottomNav: React.FC<BottomNavProps> = ({ children, ...rest }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const [placeholderHeight, setPlaceholderHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const { height, paddingBottom } = getComputedStyle(ref.current)
    setPlaceholderHeight(parseFloat(height) - parseFloat(paddingBottom))
  }, [])

  return (
    <>
      <Cell
        opacity={0}
        color="tertiary"
        borderColor="tertiary"
        marginBottom="env(safe-area-inset-bottom)"
        zIndex={-1}
        height={placeholderHeight}
      >
        the end
      </Cell>

      <Container
        ref={ref}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        px={[0, 0, 2, 4]}
        pb={[0, 0, 2, 4]}
        zIndex={Z.BOTTOM_NAV}
        {...rest}
      >
        {children}
      </Container>
    </>
  )
}
