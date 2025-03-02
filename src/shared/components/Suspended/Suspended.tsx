import { 
    Suspense, 
    ReactNode, 
    ComponentType, 
    PropsWithChildren, 
    memo,
    MemoExoticComponent
  } from 'react'
  import { Box, Typography } from '@mui/material'
import { HOCProps } from '~/shared/typings/common/common'
  
  const Fallback = () => (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h2'>Идёт загрузка...</Typography>
    </Box>
  )
  
  export const withSuspended = <TProps extends HOCProps>(
    Component: ComponentType<PropsWithChildren<TProps>>
  ): MemoExoticComponent<ComponentType<TProps>> => {
    const WrappedComponent = memo((props: TProps) => (
      <Suspense fallback={<Fallback />}>
        <Component {...props} />
      </Suspense>
    )) as MemoExoticComponent<ComponentType<TProps>>
  
    WrappedComponent.displayName = `withSuspended(${
      Component.displayName || Component.name || 'Component'
    })`
  
    return WrappedComponent
  }