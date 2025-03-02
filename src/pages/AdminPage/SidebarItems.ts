import { ReactNode } from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ChecklistIcon from '@mui/icons-material/Checklist'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface MenuButtonProps {
  menuText: string
  logo: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  link: string
}

const sidebarList: Array<MenuButtonProps> = [
  {
    menuText: 'Заявки',
    logo: AssignmentIcon,
    link: `/admin/requests`,
  },
  {
    menuText: 'Права',
    logo: ChecklistIcon,
    link: `/admin/permissions`,
  },
]

export default sidebarList
