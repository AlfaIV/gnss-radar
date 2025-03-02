import React, { memo } from 'react'
import { Stack, Button, Typography } from '@mui/material'
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined'
import { useNavigate } from 'react-router-dom'

import { UserType } from '~/shared/typings/user/userTypings'
import useUserStore from '~/entities/store/UserStore/useUserStore'

import menu, { MenuButtonProps } from './MenuList'

const MenuBar = memo(() => {
  const navigate = useNavigate()

  const [role] = useUserStore((state: UserType) => [state.role])

  return (
    <>
      {menu
        .filter((item: MenuButtonProps) => item.role.includes(role))
        .map((item: MenuButtonProps) => (
          <Button
            color='inherit'
            onClick={() => navigate(item.link)}
            sx={{ gap: '10px', alignItems: 'center' }}
            key={item.menuText}
          >
            <item.logo sx={{ fontSize: 32 }} />
            <Typography textTransform='capitalize' fontSize={24}>
              {item.menuText}
            </Typography>
          </Button>
        ))}
    </>
  )
})

export default MenuBar
