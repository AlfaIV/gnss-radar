import { createWithEqualityFn } from 'zustand/traditional'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type { StateCreator } from 'zustand'

type StoreFunction<S> = StateCreator<
  S,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]],
  [],
  S
>

interface CreateStoreOptions<S> {
  name?: string
  partialize?: (state: S) => Partial<S>
}

const defaultEqualityFn = <T>(a: T, b: T): boolean =>
  JSON.stringify(a) === JSON.stringify(b)

function createStore<S>(fn: StoreFunction<S>, options?: CreateStoreOptions<S>) {
  const middleware = (f: StoreFunction<S>) =>
    devtools(subscribeWithSelector(f), { name: options?.name })

  const equalityFnGeneric = options?.partialize
    ? <T>(a: T, b: T): boolean =>
        JSON.stringify(options.partialize!(a as unknown as S)) === JSON.stringify(options.partialize!(b as unknown as S))
    : defaultEqualityFn

  if (process.env.NODE_ENV === 'development') {
    return createWithEqualityFn(middleware(fn), equalityFnGeneric)
  }
  
  return createWithEqualityFn(fn, equalityFnGeneric)
}

export default createStore
