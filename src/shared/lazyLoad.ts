import { lazy, ComponentType } from 'react'

function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      return await importFunc()
    } catch (error) {
      //eslint-disable-next-line no-console
      console.error('Error loading component:', error)
      throw error
    }
  })
}

export default lazyLoad
