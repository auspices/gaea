import { useCallback, useEffect, useState } from 'react'

export enum Mode {
  Resting,
  Open,
}

export const useLocusToggle = () => {
  const [mode, setMode] = useState(Mode.Resting)

  const toggleMode = useCallback(() => {
    setMode(
      (prevMode) =>
        ({ [Mode.Resting]: Mode.Open, [Mode.Open]: Mode.Resting }[prevMode])
    )
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // <cmd+k>
      if (event.metaKey && event.key === 'k') {
        event.preventDefault()
        toggleMode()
      }

      // <esc>
      if (event.key === 'Escape') {
        setMode(Mode.Resting)
      }
    },
    [toggleMode]
  )

  const handleClose = () => setMode(Mode.Resting)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    mode,
    handleClose,
  }
}
