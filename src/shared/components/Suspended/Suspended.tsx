import { Suspense, ComponentType, memo, MemoExoticComponent } from 'react'
import { Box, Typography } from '@mui/material'

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

interface SuspendedHOCProps {
  fallback?: React.ReactNode
}

export const withSuspended = <TProps extends object>(
  Component: ComponentType<TProps>,
): MemoExoticComponent<ComponentType<TProps & SuspendedHOCProps>> => {
  const WrappedComponent = memo((props: TProps & SuspendedHOCProps) => {
    const { fallback, ...rest } = props
    return (
      <Suspense fallback={fallback ?? <Fallback />}>
        <Component {...(rest as TProps)} />
      </Suspense>
    )
  }) as MemoExoticComponent<ComponentType<TProps & SuspendedHOCProps>>

  WrappedComponent.displayName = `withSuspended(${
    Component.displayName || Component.name || 'Component'
  })`

  return WrappedComponent
}
