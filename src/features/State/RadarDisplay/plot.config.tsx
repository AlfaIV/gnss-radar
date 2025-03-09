import { Data, Layout } from 'plotly.js'

import { SatellitesType } from '~/shared/typings/radar/radar'

export const configurateLayout = (
  satellites: SatellitesType[],
): Partial<Layout> => {
  return {
    polar: {
      radialaxis: {
        visible: true,
        range:
          (!!satellites && [
            0,
            Math.max(...satellites.map((s) => s.range)) + 1000,
          ]) ||
          1000,
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

export const configuratePlot = (satellites: SatellitesType[]): Data[] => {
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
      name: 'Satellites',
    } as unknown as Data,
  ]
}
