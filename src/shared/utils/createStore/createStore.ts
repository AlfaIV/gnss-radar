import { createWithEqualityFn } from 'zustand/traditional'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type { StateCreator, StoreApi } from 'zustand'

type StoreFunction<S> = StateCreator<
  S,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]],
  [],
  S
>

interface CreateStoreOptions {
  name?: string
}

const equalityFn = <T>(a: T, b: T): boolean => JSON.stringify(a) === JSON.stringify(b)

function createStore<S>(fn: StoreFunction<S>, options?: CreateStoreOptions) {
  const middleware = (f: StoreFunction<S>) => 
    devtools(subscribeWithSelector(f), { name: options?.name })

  if (process.env.NODE_ENV === 'development') {
    return createWithEqualityFn(middleware(fn), equalityFn)
  }
  
  return createWithEqualityFn(fn, equalityFn)
}

export default createStore