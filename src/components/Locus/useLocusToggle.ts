import { useCallback, useEffect } from 'react'
import { useLocus } from './LocusContext'

export const useLocusToggle = () => {
  const { dispatch } = useLocus()

  const toggleMode = useCallback(() => {
    dispatch({ type: 'TOGGLE' })
  }, [dispatch])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // <cmd+k>
      if (event.metaKey && event.key === 'k') {
        event.preventDefault()
        toggleMode()
      }

      // <esc>
      if (event.key === 'Escape') {
        dispatch({ type: 'CLOSE' })
      }
    },
    [dispatch, toggleMode]
  )

  const handleClose = () => dispatch({ type: 'CLOSE' })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return { handleClose }
}
