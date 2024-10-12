import stateIco from '../../assets/icons/stateIco.svg'
import measureIco from '../../assets/icons/measureIco.svg'
import taskIco from '../../assets/icons/taskIco.svg'
import settingIco from '../../assets/icons/settingIco.svg'

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
