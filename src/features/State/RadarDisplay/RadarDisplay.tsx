import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Collapse,
  Box,
  Skeleton,
} from '@mui/material'
import { memo, useState } from 'react'

import {
  RADAR_TYPE,
  RADAR_TYPE_POLAR,
  RADAR_TYPE_SPHERE,
} from '~/shared/config/constants'

import RadarDisplayPolar from './RadarDisplayPolar'
import RadarDisplaySphere from './RadarDisplaySphere'
import { GroupProvider, useGroupContext } from '../context/GroupContext'

const RADAR_TYPE_CACHE_KEY = 'radarTypeCache'

const RadarDisplay = memo(() => {
  const [currentRadar, setCurrentRadar] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(RADAR_TYPE_CACHE_KEY)
      return cached || RADAR_TYPE_POLAR.value
    }
    return RADAR_TYPE_POLAR.value
  })

  const { groups, setSelectedGroups, selectedGroups } = useGroupContext()

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value
    setCurrentRadar(newValue)
    // Сохраняем в кэш
    localStorage.setItem(RADAR_TYPE_CACHE_KEY, newValue)
  }

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        flex={1}
      >
        <Box width='100%' justifyContent='center' display='flex'>
        <FormControl fullWidth sx={{ width: '259.5px', height: '56px', px: 1}} size='medium'>
          <InputLabel id='group-select-label'>Группы спутников</InputLabel>
          <Select
            multiple
            labelId='group-select-label'
            id='group-select'
            label='Группы спутников'
            value={selectedGroups}
            onChange={(e) => setSelectedGroups(e.target.value as string[])}
            renderValue={(selected) =>
              selected.join(', ')
            }
          >
            {!!groups.length && groups.map((group) => (
              <MenuItem
                key={`key__${group}`}
                value={group}
              >{group}</MenuItem>
            ))}
            {!groups.length && (
              <>
                <MenuItem disabled>
                  <Skeleton
                    width='100%'
                    height={32}
                    sx={{
                      borderRadius: '4px',
                      transform: 'none',
                      my: 0.5,
                    }}
                  />
                </MenuItem>
                <MenuItem disabled>
                  <Skeleton
                    width='80%'
                    height={32}
                    sx={{
                      borderRadius: '4px',
                      transform: 'none',
                      my: 0.5,
                    }}
                  />
                </MenuItem>
                <MenuItem disabled>
                  <Skeleton
                    width='90%'
                    height={32}
                    sx={{
                      borderRadius: '4px',
                      transform: 'none',
                      my: 0.5,
                    }}
                  />
                </MenuItem>
              </>
            )}
          </Select>
        </FormControl>
          <FormControl
            fullWidth
            size='medium'
            sx={{ width: '259.5px', height: '56px', px: 1 }}
          >
            <InputLabel id='radar-select-label'>Тип радара</InputLabel>
            <Select
              labelId='radar-select-label'
              id='radar-select'
              value={currentRadar}
              label='Тип радара'
              onChange={handleChange}
              defaultValue={RADAR_TYPE_POLAR.value}
            >
              {RADAR_TYPE.map((radar) => (
                <MenuItem key={radar.value} value={radar.value}>
                  {radar.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {currentRadar === RADAR_TYPE_POLAR.value && <RadarDisplayPolar />}
        {currentRadar === RADAR_TYPE_SPHERE.value && <RadarDisplaySphere />}
      </Box>
      </>
  )
})

export default RadarDisplay