import styles from './menuButton.module.scss';
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
            <img
                className={styles.menuButton__img}
                src={logoPath}
                alt="menulogo"
            />
            <p
                className={styles.menuButton__text}
            >{menuText}</p>
        </div>
    )
}
export default MenuButton