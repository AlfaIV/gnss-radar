import styles from './header.module.css'
import MenuButton from '../menuButton/menuButton'
import menu from './menuList';
import logo from '@icons/radarIco.svg'
import userIco from '@icons/defaultUserIco.svg'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className='header__logo'>
                <img src={logo} alt="menulogo" />
                <p>ГНСС Радар</p>
            </div>
            {menu.map((item) => (
                <MenuButton
                    key={item.menuText}
                    menuText={item.menuText}
                    logoPath={item.logoPath}
                ></MenuButton>
            ))}
            <div className='header__user'>
                <p>defaultUser</p>
                <img src={userIco} alt="userlogo" />
            </div>
        </div>
    );
};  

export default Header
