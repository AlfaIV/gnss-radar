import stateIco from '@icons/stateIco.svg'
import measureIco from '@icons/measureIco.svg'
import taskIco from '@icons/taskIco.svg'
import settingIco from '@icons/settingIco.svg'


interface MenuButtonProps{
    menuText: string;
    logoPath: string;
    link: string;
}

const menu: Array<MenuButtonProps> = [
    {menuText: 'Состояние', logoPath: stateIco, link: `state/`},
    {menuText: 'Измерения', logoPath: measureIco, link: `measure/`},
    {menuText: 'Задания', logoPath: taskIco, link: `task/`},
    {menuText: 'Настройки', logoPath: settingIco, link: `setting/`},
];

export default menu;
