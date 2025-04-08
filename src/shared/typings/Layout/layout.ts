import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { ReactNode } from 'react'

export type SidebarItemProps = {
  menuText: string
  logo: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  link: string
}

export type SidebarProps = {
  items: SidebarItemProps[]
  children?: ReactNode | string
}

export type RoleGuardProps = {
    role?: string[]
}