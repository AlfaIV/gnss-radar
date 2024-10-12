import styles from './menuButton.module.css';
import { FC } from 'react';

interface MenuButtonProps{
    menuText: string;
    logoPath: string;
}

const MenuButton:FC<MenuButtonProps> = ({menuText, logoPath}) => {
    return (
        <div 
            className={styles.menuButton}
        >
            <img src={logoPath} alt="menulogo" />
            <p>{menuText}</p>
        </div>
    )
}
export default MenuButton