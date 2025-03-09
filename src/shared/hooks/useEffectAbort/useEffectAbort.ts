import { useEffect } from 'react'

const useEffectAbort = (callback: Function, deps: Array<any>) => {
  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    callback(signal)

    return () => controller.abort()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps])
}

export default useEffectAbort
