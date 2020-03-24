import { useCallback, useState } from 'react'

export enum Mode {
  Resting,
  Active,
}

export const useActive = () => {
  const [mode, setMode] = useState(Mode.Resting)

  const setActive = useCallback(() => setMode(Mode.Active), [])
  const setResting = useCallback(() => setMode(Mode.Resting), [])

  const toggleMode = useCallback(() => {
    setMode(
      (prevMode) =>
        ({ [Mode.Resting]: Mode.Active, [Mode.Active]: Mode.Resting }[prevMode])
    )
  }, [])

  return {
    Mode,
    mode,
    setMode,
    setActive,
    setResting,
    toggleMode,
  }
}
