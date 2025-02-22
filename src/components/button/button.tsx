import { FC } from 'react'

import style from './button.module.scss'

interface ButtonProps {
  text: string
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <div className={style.button}>
      <p className={style.button__text}>{text}</p>
    </div>
  )
}

export default Button
