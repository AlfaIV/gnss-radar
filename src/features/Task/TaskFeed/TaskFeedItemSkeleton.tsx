import {
  Card,
  CardContent,
  Skeleton,
  Stack,
  Divider,
  Box,
  Chip,
} from '@mui/material'
import { memo, forwardRef } from 'react'

const TaskFeedItemSkeleton = memo(() => {
  return (
    <Box
      sx={{
        mb: 2,
        boxShadow: 2,
        borderRadius: 2,
        height: 'fit-content',
        width: 800,
      }}
    >
      <Box sx={{ padding: 5 }}>
        <Stack spacing={2}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
          >
            <Skeleton
              variant='text'
              width='60%'
              height={32}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant='rectangular'
              width={150}
              height={24}
              sx={{ borderRadius: 16 }}
            />
          </Box>

          <Skeleton
            variant='rectangular'
            width='100%'
            height={72}
            sx={{ borderRadius: 1 }}
          />

          <Stack direction='row' spacing={4}>
            {[1, 2].map((i) => (
              <Stack key={i} spacing={0.5}>
                <Skeleton
                  variant='text'
                  width={60}
                  sx={{ fontSize: '0.75rem' }}
                />
                <Skeleton
                  variant='text'
                  width={140}
                  sx={{ fontSize: '0.875rem' }}
                />
              </Stack>
            ))}
          </Stack>

          <Divider />

          <Stack spacing={0.5}>
            <Skeleton variant='text' width='40%' height={24} />
            <Skeleton variant='text' width='60%' height={20} />
          </Stack>

          <Divider />

          <Stack
            direction='row'
            spacing={1}
            sx={{
              flexWrap: 'wrap',
              gap: 1,
              py: 2,
            }}
          >
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant='rectangular'
                width={120}
                height={32}
                sx={{ borderRadius: 16 }}
              />
            ))}
          </Stack>

          <Divider />

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              pt: 2,
            }}
          >
            {[1, 2].map((i) => (
              <Skeleton
                key={i}
                variant='rectangular'
                width={120}
                height={40}
                sx={{ borderRadius: 20 }}
              />
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  )
})

export default TaskFeedItemSkeleton
