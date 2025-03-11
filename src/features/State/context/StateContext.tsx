import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { HOCProps } from '~/shared/typings/common/common'

interface FileContextType {
  hasLoadedFile: boolean
  setHasLoadedFile: Dispatch<SetStateAction<boolean>>
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export const FileProvider = (props: HOCProps) => {
  const { children } = props
  const [hasLoadedFile, setHasLoadedFile] = useState(false)

  return (
    <FileContext.Provider value={{ hasLoadedFile, setHasLoadedFile }}>
      {children}
    </FileContext.Provider>
  )
}

export const useFileContext = () => {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error('useFileContext must me used within a File Provider')
  }

  return context
}
