import React, { memo, useState } from 'react'
import { Box, IconButton, Drawer, Typography, Button } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Link } from 'react-router-dom'

import { SidebarItemProps, SidebarProps } from '~/shared/typings/Layout/layout'

const Sidebar = memo((props: SidebarProps) => {
  const { items, children } = props
  const [isOpen, setIsOpen] = useState(true)
  const drawerWidth = 250
  const collapsedWidth = 124

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <Drawer
        variant='permanent'
        sx={{
          width: isOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: isOpen ? drawerWidth : collapsedWidth,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            overflow: 'visible',
            position: 'relative',
            borderTopRightRadius: '22px',
            borderBottomRightRadius: '22px',
          },
        }}
      >
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Скрыть сайдбар' : 'Показать сайдбар'}
          sx={{
            position: 'absolute',
            right: '-20px',
            top: '15%',
            transform: 'translateY(-50%)',
            zIndex: 1300,
            backgroundColor: 'rgba(238, 247, 254, 1)',
            boxShadow: 3,
            padding: '5',
            '&:hover': {
              backgroundColor: 'rgba(238, 247, 254, 1)',
            },
            width: 40,
            height: 40,
          }}
        >
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        <Box sx={{ p: isOpen ? 2 : 1 }}>
          {items.map((item: SidebarItemProps) => (
            <Link to={item.link} key={item.link}>
              <Button sx={{ width: '100%' }}>
                <Box
                  flexDirection='row'
                  display='flex'
                  width='100%'
                  justifyContent={isOpen ? 'start' : 'center'}
                  alignItems='center'
                  gap={2}
                >
                  <item.logo sx={{ fontSize: '40px' }} />
                  {isOpen && (
                    <Typography textAlign='left' flexGrow={1} fontSize='32px'>
                      {item.menuText}
                    </Typography>
                  )}
                </Box>
              </Button>
            </Link>
          ))}
        </Box>
      </Drawer>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  )
})

export default Sidebar
