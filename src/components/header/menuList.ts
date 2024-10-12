import stateIco from '@icons/stateIco.svg'
import measureIco from '@icons/measureIco.svg'
import taskIco from '@icons/taskIco.svg'
import settingIco from '@icons/settingIco.svg'

interface MenuButtonProps{
    menuText: string
    logoPath: string
}

const menu: Array<MenuButtonProps> = [
    {menuText: 'Состояние', logoPath: stateIco},
    {menuText: 'Измерения', logoPath: measureIco},
    {menuText: 'Задания', logoPath: taskIco},
    {menuText: 'Настройки', logoPath: settingIco},
];

export default menu;
