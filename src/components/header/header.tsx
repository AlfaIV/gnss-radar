import styles from './header.module.scss'
import MenuButton from '../menuButton/menuButton'
import menu from './menuList';
import logo from '@icons/radarIco.svg'
import userIco from '@icons/defaultUserIco.svg'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__logo}>
                <img src={logo} alt="menulogo" />
                <p>Мониторинг</p>
            </div>
            {menu.map((item) => (
                <MenuButton
                    key={item.menuText}
                    menuText={item.menuText}
                    logoPath={item.logoPath}
                    link={item.link}
                ></MenuButton>
            ))}
            <div className={styles.header__user}>
                <p>defaultUser</p>
                <img src={userIco} alt="userlogo" />
            </div>
        </div>
    );
};  

export default Header
