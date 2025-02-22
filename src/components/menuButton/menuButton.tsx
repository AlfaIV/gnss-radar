import { Link } from 'react-router-dom'
import { FC } from 'react'

import styles from './menuButton.module.scss'

interface MenuButtonProps {
  menuText: string
  logoPath: string
  link: string
}

const MenuButton: FC<MenuButtonProps> = ({ menuText, logoPath, link }) => {
  return (
    <Link to={link} className={styles.menuButton}>
      <img className={styles.menuButton__img} src={logoPath} alt='menulogo' />
      <p className={styles.menuButton__text}>{menuText}</p>
    </Link>
  )
}
export default MenuButton
