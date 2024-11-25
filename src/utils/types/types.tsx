import { Moment } from "moment";

export interface User{
  id?: string;
  name?: string | null;
  surname?: string | null;
  company?: string | null;
  email?: string;
  login?: string;
  password?: string | null;
  role?: string;
  CreatedAt?: string;
}

export interface UserForm {
  surname: string;
  name: string;
  company: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  services: {
    download: boolean;
    taskCreation: boolean;
    deviseControl: boolean;
  };
}


export interface Satellite {
  Id: string;
  Name: string;
  ExternalID?: string;
}

export interface Device {
  id?:  bigint;
  backendID?: string;
  name?: string;
  token?: string;
  description?: string;
  coordinates?: {
    x: string;
    y: string;
    z: string;
  };
}

export interface task {
  id?: bigint;
  backendID?: string;
  device: Device | null;
  name: string;
  description?: string | null;
  startDataTime: Moment;
  endDataTime: Moment;
  target?: Satellite | null;
  targetID?: string;
  signal?: signalType | null;
  groupType?: groupType | null;
}

export interface Measure {
  id: string,
  token: string,
  startTime: Moment,
  endTime: Moment,
  group: groupType,
  signalType: signalType,
  target: string,
  spectrum?: SpectrumMeasure,
  power?: PowerMeasure,
  link?: string,
}

export interface SpectrumMeasure {
  spectrum: number[],
  StartFreq: number,
  FreqStep: number,
  startTime: Moment,
}

export interface PowerMeasure {
  power: number[],
  startTime: Moment
  timeStep: number
}


export type signalType = "L1" | "L2" | "L5" | "G1" | "G2" | "G5" | "E1" | "E5" | "E6" |  "B1" | "B2" | "B3" | "all";
export enum signals {
  L1 = "L1",
  L2 = "L2",
  L5 = "L5",
  G1 = "G1",
  G2 = "G2",
  G5 = "G5",
  E1 = "E1",
  E5 = "E5",
  E6 = "E6",
  B1 = "B1",
  B2 = "B2",
  B3 = "B3",
  all = "all"
}
export type groupType = "GPS" | "Glonass" | "Galileo" | "Baidou" | "all";
export enum groups {
  GPS = "GPS",
  Glonass = "Glonass",
  Galileo = "Galileo",
  Baidou = "Baidou",
  all = "all"
}