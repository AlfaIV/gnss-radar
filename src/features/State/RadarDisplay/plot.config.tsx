import { Data, Layout } from 'plotly.js'

import { SatellitesType } from '~/shared/typings/radar/radar'

export const configurateLayoutPolar = (
  satellites: SatellitesType[],
  radialRange?: [number, number]
): Partial<Layout> => {
  const autoRange = satellites?.length 
    ? [0, Math.max(...satellites.map((s) => s.range)) + 1000]
    : [0, 1000]

    
  return {
    polar: {
      radialaxis: {
        visible: true,
        range: radialRange || autoRange,
        angle: 90,
        tickangle: 90,
        tickfont: { size: 10 },
      },
      angularaxis: {
        direction: 'clockwise' as const,
        rotation: 90,
        showline: true,
        tickmode: 'array' as const,
        tickvals: [0, 90, 180, 270],
        ticktext: ['N', 'E', 'S', 'W'],
        tickfont: { size: 12 },
      },
      bgcolor: '#f0f0f0',
    },
    showlegend: false,
    margin: { t: 50, b: 30, l: 100, r: 100 },
    title: 'Позиции спутников',
    font: { family: 'Arial, sans-serif', size: 14 },
  }
}

export const configuratePlotPolar = (satellites: SatellitesType[]): Data[] => {
  return [
    {
      type: 'scatterpolar',
      mode: 'markers+text' as any,
      r: satellites?.map((sat) => sat.range),
      theta: satellites?.map((sat) => sat.azimuth),
      text: satellites?.map((sat) => sat.name),
      textposition: 'top center',
      textfont: { size: 12, color: '#000' },
      marker: {
        size: 12,
        color: '#FF0000',
        symbol: 'circle',
      },
      hoverinfo: 'none',
      hovertemplate:
        '<b>Название</b>: %{text}<br>' +
        '<b>Азимут</b>: %{theta:.2f}°<br>' +
        '<b>Расстояние</b>: %{r:.2f} м<extra></extra>',
      name: 'Спутиник',
    } as unknown as Data,
  ]
}

export const configurateLayoutSpherical = (
  satellites: SatellitesType[],
  radialRange?: [number, number]
): Partial<Layout> => {
  return {
    polar: {
      bgcolor: '#f0f0f0',
      gridshape: 'circular',
      radialaxis: {
        visible: true,
        showgrid: true,
        gridcolor: '#ccc',
        gridwidth: 1,
        range: radialRange || [90, 0],
        dtick: 15,
        angle: 90,
        tickangle: 90,
        tickfont: { size: 10 },
        title: { text: 'Угол места (°)' },
      },
      angularaxis: {
        showgrid: true,
        gridcolor: '#ddd',
        gridwidth: 1,
        direction: 'clockwise',
        rotation: 90,
        showline: true,
        tickmode: 'linear',
        tick0: 0,
        dtick: 15,
        tickvals: [0, 90, 180, 270],
        ticktext: ['N', 'E', 'S', 'W'],
        tickfont: { size: 12 },
        title: { text: 'Азимут (°)' },
      },
    },
    showlegend: false,
    margin: { t: 50, b: 30, l: 100, r: 100 },
    title: 'Позиции спутников',
    font: { family: 'Arial, sans-serif', size: 14 },
    colorway: ['#1f77b4'],
  }
}

export const configuratePlotSpherical = (
  satellites: SatellitesType[],
): Data[] => {
  return [
    {
      type: 'scatterpolar',
      mode: 'markers+text',
      r: satellites?.map((sat) => sat.elevation),
      theta: satellites?.map((sat) => sat.azimuth),
      text: satellites?.map((sat) => sat.name),
      textposition: 'top center',
      textfont: { size: 12, color: '#000' },
      hoverinfo: 'none',
      marker: {
        size: 12,
        color: '#FF0000',
        symbol: 'circle',
      },
      hovertemplate:
        '<b>Название</b>: %{text}<br>' +
        '<b>Азимут</b>: %{theta:.2f}°<br>' +
        '<b>Угол места</b>: %{r:.2f}°<br>',
      name: 'Спутник',
    } as unknown as Data,
  ]
}
