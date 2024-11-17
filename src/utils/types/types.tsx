export interface Satellite {
  Id: string;
  Name: string;
  ExternalID?: string;
}

export interface Device {
  id: number;
  name: string;
  token: string;
  description?: string;
  coordinates?: {
    x: string;
    y: string;
    z: string;
  };
}

export type signalTypes = "L1" | "L2" | "L5" | "G1" | "G2" | "G5" | "E1" | "E5" | "E6" |  "B1" | "B2" | "B3" | "all";
export type groupTypes = "GPS" | "Glonass" | "Galileo" | "Baidou" | "all";