import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

import { HOCProps } from '~/shared/typings/common/common'
import { GroupContextType } from '~/shared/typings/radar/radar'

const SELECTED_GROUPS_CACHE_KEY = 'selectedGroupsCache';

const GroupContext = createContext<GroupContextType | undefined>(undefined)

export const GroupProvider = (props: HOCProps) => {
  const { children } = props
  
  const [groups, setFilterGroups] = useState<string[]>([])

  const [selectedGroups, setFilterSelectedGroups] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(SELECTED_GROUPS_CACHE_KEY)
      return cached ? JSON.parse(cached) : []
    }
    return []
  })

  const setAvailableGroups = (groups: string[]) => {
    const uniqueGroups = [...new Set(groups)]
    
    setFilterGroups(uniqueGroups)
  }

  const setSelectedGroups = (groups: string[]) => {
    const uniqueGroups = [...new Set(groups)]
    setFilterSelectedGroups(uniqueGroups)
    localStorage.setItem(SELECTED_GROUPS_CACHE_KEY, JSON.stringify(uniqueGroups))
  }

  return (
    <GroupContext.Provider value={{ groups, setAvailableGroups, selectedGroups, setSelectedGroups }}>
      {children}
    </GroupContext.Provider>
  )
}

export const useGroupContext = () => {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error('useGroupContext must be used within a Group Provider')
  }
  return context
}