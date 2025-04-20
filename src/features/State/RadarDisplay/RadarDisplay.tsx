import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Collapse, Box } from "@mui/material";
import { memo, useState } from "react";
import { RADAR_TYPE, RADAR_TYPE_POLAR, RADAR_TYPE_SPHERE } from "~/shared/config/constants";
import RadarDisplayPolar from "./RadarDisplayPolar";
import RadarDisplaySphere from "./RadarDisplaySphere";


const RadarDisplay = memo(() => {

    const [currentRadar, setCurrentRadar] = useState<string>(RADAR_TYPE_POLAR.value)

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCurrentRadar(event.target.value)
      }


    return (<>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} flex={1}>
    <Box width={'100%'} justifyContent={'center'} display={'flex'}>
        <FormControl
      fullWidth
      size='medium'
      sx={{ width: '259.5px', height: '56px', padding: '10px' }}
    >
      <InputLabel id='radar-select-label'>Тип радара</InputLabel>
      <Select
        labelId='radar-select-label'
        id='radar-select'
        value={currentRadar}
        label='Предмет'
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
    </>)
})

export default RadarDisplay;