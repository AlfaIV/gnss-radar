import { ReactNode } from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ChecklistIcon from '@mui/icons-material/Checklist'
import PeopleIcon from '@mui/icons-material/People'
import RestorePageIcon from '@mui/icons-material/RestorePage'
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
  {
    menuText: 'Пользователи',
    logo: PeopleIcon,
    link: `/admin/users`,
  },
  {
    menuText: 'Удаленные',
    logo: RestorePageIcon,
    link: `/admin/restore`,
  },
]

export default sidebarList
