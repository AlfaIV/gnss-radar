import { StateIcon, MeasureIcon, TaskIcon, SettingsIcon } from '~/shared'

interface MenuButtonProps {
  menuText: string
  logoPath: string
  link: string
}

const menu: Array<MenuButtonProps> = [
  { menuText: 'Состояние', logoPath: StateIcon, link: `state/` },
  { menuText: 'Измерения', logoPath: MeasureIcon, link: `measure/` },
  { menuText: 'Задания', logoPath: TaskIcon, link: `task/` },
  { menuText: 'Настройки', logoPath: SettingsIcon, link: `setting/` },
]

export default menu
