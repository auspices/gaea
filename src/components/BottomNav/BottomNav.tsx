import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Box, BoxProps, Pill } from '@auspices/eos'
import { themeGet } from '@styled-system/theme-get'
import { hexAlpha } from '../../util/hexAlpha'
import { Z } from '../../util/zIndexes'

const Container = styled(Box)`
  margin-bottom: env(safe-area-inset-bottom);

  > * {
    backdrop-filter: blur(${themeGet('space.3')});
  }

  * {
    background-color: ${(props) =>
      hexAlpha(themeGet('colors.background')(props), 0.25)};
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
      <Pill
        opacity={0}
        color="tertiary"
        borderColor="tertiary"
        zIndex={-1}
        height={placeholderHeight}
      >
        the end
      </Pill>

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
