interface SatelliteData {
  name: string;
  range: number;
  azimuth: number;
  elevation: number;
}

interface GnssTable {
  [key: string]: SatelliteData[];
}

const gnssTable: GnssTable = {
  GLONASS: [
    {
      name: "GLN1",
      range: 150,
      azimuth: 45,
      elevation: 150,
    },
    {
      name: "GLN2",
      range: 200,
      azimuth: 180,
      elevation: 200,
    },
  ],
  GPS:[
    {
        name: "GPS1",
        range: 250,
        azimuth: 180,
        elevation: 150,
      },
      {
        name: "GPS2",
        range: 150,
        azimuth: 360,
        elevation: 200,
      },
  ],
};

export default gnssTable;