import { Moment } from "moment";

interface filters {
  satelliteType: {
    GPS: boolean;
    Glonass: boolean;
    Galileo: boolean;
    Baidou: boolean;
  };
  signalType: {
    L1: boolean;
    L2: boolean;
    L3: boolean;
  };
  startData: Moment | null;
  endData: Moment | null;
  timeRange: number[];
}

export default filters