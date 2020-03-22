import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import composeRefs from '@seznam/compose-react-refs'
import { boxMixin, BoxProps } from '@auspices/eos'

enum Mode {
  Pending,
  Error,
  Loaded,
}

export const Img = styled.img<{ mode: Mode }>`
  max-width: 100%;
  max-height: 100%;
  vertical-align: bottom;
  opacity: 0;
  transition: opacity 250ms;
  ${boxMixin}

  ${({ mode }) => {
    switch (mode) {
      case Mode.Pending:
        return ``
      case Mode.Loaded:
        return `
          opacity: 1;
        `
      case Mode.Error:
        return `
          opacity: 0;
        `
    }
  }};
`

export type ImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src'
> &
  BoxProps & {
    srcs: string[]
    onError?(): void
    onLoad?(): void
  }

// TODO: Extract to eos
export const Image = React.forwardRef(
  (
    { srcs, alt, onError, onLoad, ...rest }: ImageProps,
    forwardedRef: React.Ref<HTMLImageElement>
  ) => {
    const [mode, setMode] = useState(Mode.Pending)
    const ref = React.useRef<HTMLImageElement>(null)

    const handleError = useCallback(() => {
      setMode(Mode.Error)
      onError && onError()
    }, [onError])

    const handleLoad = useCallback(() => {
      setMode(Mode.Loaded)
      onLoad && onLoad()
    }, [onLoad])

    useEffect(() => {
      if (ref.current?.complete) {
        handleLoad()
      }
    }, [handleLoad, ref])

    const [src1x, src2x] = srcs

    return (
      <Img
        ref={composeRefs(ref, forwardedRef)}
        mode={mode}
        src={src1x}
        {...(src2x
          ? {
              srcSet: `${src1x} 1x, ${src2x} 2x`,
            }
          : {})}
        onError={handleError}
        onLoad={handleLoad}
        alt={alt ?? 'a meaningful description'}
        {...rest}
      />
    )
  }
)

Image.displayName = 'Image'
