import { ReactNode } from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import TaskIcon from '@mui/icons-material/Task'
import TimelineIcon from '@mui/icons-material/Timeline'
import RouterIcon from '@mui/icons-material/Router'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

import {
  ROLE_ADMIN,
  ROLE_SUPERVISOR,
  ROLE_USER,
} from '~/shared/config/constants'

export interface MenuButtonProps {
  menuText: string
  logo: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  link: string
  role: string[]
}

const menu: Array<MenuButtonProps> = [
  {
    menuText: 'Состояние',
    logo: RouterIcon,
    link: `/state`,
    role: [ROLE_ADMIN.value, ROLE_SUPERVISOR.value, ROLE_USER.value],
  },
  // {
  //   menuText: 'Измерения',
  //   logo: TimelineIcon,
  //   link: `/measure`,
  //   role: [ROLE_ADMIN.value, ROLE_SUPERVISOR.value, ROLE_USER.value],
  // },
  {
    menuText: 'Задания',
    logo: TaskIcon,
    link: `/task`,
    role: [ROLE_ADMIN.value, ROLE_SUPERVISOR.value, ROLE_USER.value],
  },
  // {
  //   menuText: 'Настройки',
  //   logo: SettingsApplicationsIcon,
  //   link: `/settings`,
  //   role: [ROLE_ADMIN.value, ROLE_SUPERVISOR.value, ROLE_USER.value],
  // },
  {
    menuText: 'Администрирование',
    logo: SupervisorAccountIcon,
    link: `/admin/welcome`,
    role: [ROLE_ADMIN.value],
  },
]

export default menu
