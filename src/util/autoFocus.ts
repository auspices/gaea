export const isTouchDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const AUTOFOCUS = !isTouchDevice()
