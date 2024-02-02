import { useEffect } from "react"

  function useKeyPress(targetKey: string, action: (e: KeyboardEvent) => void) {
  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === targetKey) action(e)
    }

    window.addEventListener("keydown", onKeydown)

    return () => window.removeEventListener("keydown", onKeydown)
  }, [targetKey, action])
}

export default useKeyPress
