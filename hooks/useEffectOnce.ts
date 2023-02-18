import { useEffect, useRef } from "react"

export const useEffectOnce = (fn: () => void) => {
  const initialRef = useRef(true)
  useEffect(() => {
    if (initialRef.current) {
      fn()
    }
    initialRef.current = false
  }, [initialRef.current])
}
