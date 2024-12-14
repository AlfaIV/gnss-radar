import axios from "axios";
import grqlFetch from "@utils/grql";
import {
  Satellite,
  Device,
  groups,
  signals,
  User,
  Measure,
  SpectrumMeasure,
  PowerMeasure,
} from "@utils/types/types";
import { task } from "@utils/types/types";
import moment from "moment";
import { Power } from "@mui/icons-material";

const SIGNAL_TYPE: Map<signals | string, string | signals> = new Map();
SIGNAL_TYPE.set(signals.L1, "SIGNAL_TYPE_L1");
SIGNAL_TYPE.set(signals.L2, "SIGNAL_TYPE_L2");
SIGNAL_TYPE.set(signals.all, "SIGNAL_TYPE_UNKNOWN");
SIGNAL_TYPE.set("SIGNAL_TYPE_L1", signals.L1);
SIGNAL_TYPE.set("SIGNAL_TYPE_L2", signals.L2);
SIGNAL_TYPE.set("SIGNAL_TYPE_UNKNOWN", signals.all);

const GROUPING_TYPE: Map<groups | string, string | groups> = new Map();
GROUPING_TYPE.set(groups.GPS, "GROUPING_TYPE_GPS");
GROUPING_TYPE.set(groups.Glonass, "GROUPING_TYPE_GLONASS");
GROUPING_TYPE.set(groups.Galileo, "GROUPING_TYPE_GALILEO");
GROUPING_TYPE.set(groups.Baidou, "GROUPING_TYPE_BEIDOU");
GROUPING_TYPE.set(groups.all, "GROUPING_TYPE_UNKNOWN");
GROUPING_TYPE.set("GROUPING_TYPE_GPS", groups.GPS);
GROUPING_TYPE.set("GROUPING_TYPE_GLONASS", groups.Glonass);
GROUPING_TYPE.set("GROUPING_TYPE_GALILEO", groups.Galileo);
GROUPING_TYPE.set("GROUPING_TYPE_BEIDOU", groups.Baidou);
GROUPING_TYPE.set("GROUPING_TYPE_UNKNOWN", groups.all);

const IdToBigInt = (id: string) => BigInt(id.replace(/\D/g, ""));

export async function getSatellites(): Promise<Satellite[]> {
  const listSatellitesRequest = `query listSatellites{
    listSatellites(filter:{}){
      items{
        Id
        SatelliteName
      }
    }
  }`;

  const response: any = await grqlFetch(listSatellitesRequest);
  const satellites: Satellite[] =
    await response?.data?.listSatellites?.items?.map((item: any) => ({
      Id: item.Id,
      Name: item.SatelliteName,
    }));
  return satellites;
}

export async function getSatellitesFromDevice(
  Device: Device
): Promise<Satellite[]> {
  const listSatellitesRequest = `query listSatellites{
    listSatellites(filter:{deviceIds:"${Device.backendID}"}){
      items{
        Id
        SatelliteName
      }
    }
  }`;

  const response: any = await grqlFetch(listSatellitesRequest);
  const satellites: Satellite[] =
    await response?.data?.listSatellites?.items?.map((item: any) => ({
      Id: item.Id,
      Name: item.SatelliteName,
    }));
  return satellites;
}

export async function getSatellitesCoordinate(
  Device: Device
): Promise<Satellite[]> {
  const listSatellitesRequest = `query listGnss {
    listGnss(filter: {coordinates:{x:"1", y:"2", z: "3"}}){
      items {
        Id
        Coordinates{
          x
          y
          z
        }
        azimuth
        elevation_angle
        distance
      }
    }
  }`;

  const response: any = await grqlFetch(listSatellitesRequest);
  const satellites: Satellite[] =
    await response?.data?.listGnss?.items?.map((item: any) => ({
      Id: item.Id,
      Name: item.SatelliteName,
      x: item.Coordinates.x,
      y: item.Coordinates.y,
      z: item.Coordinates.z,
      azimuth: item.azimuth,
      elevation: item.elevation_angle,
      range: item.distance,
    }));
  return satellites;
}

export async function getDevices(): Promise<Device[]> {
  const getDevicesRequest = `query listDevice{
    listDevice(filter:{}){
      items{
        id
        name
        token
        description
        Coords{
          x
          y
          z
        }
      }
    }
  }`;
  const response: any = await grqlFetch(getDevicesRequest);
  const devices: Device[] = await response?.data?.listDevice?.items?.map(
    (item: any) => ({
      id: IdToBigInt(item.id),
      backendID: item.id,
      name: item.name,
      token: item.token,
      description: item.description,
      coordinates: {
        x: item.Coords.x,
        y: item.Coords.y,
        z: item.Coords.z,
      },
    })
  );
  return devices;
}

export async function updateDevice(updateDevices: Device): Promise<Device[]> {
  const updateDeviceRequest = `mutation updateDevice {
    gnss {
      updateDevice(
        input: {Id: "${updateDevices.backendID}", Name: "${updateDevices.name}", Description: "${updateDevices.description}", Coords: {x: "${updateDevices.coordinates?.x}", y: "${updateDevices.coordinates?.y}", z: "${updateDevices?.coordinates?.z}"}}
      ){
        device {
          id
          name
          token
          description
          Coords{
            x
            y
            z
          }
        }
      }
    }
  }`;
  const response: any = await grqlFetch(updateDeviceRequest);
  const device: Device[] = await response?.data?.listDevice?.items?.map(
    (item: any) => ({
      id: IdToBigInt(item.id),
      backendID: item.id,
      name: item.name,
      token: item.token,
      description: item.description,
      coordinates: {
        x: item.Coords.x,
        y: item.Coords.y,
        z: item.Coords.z,
      },
    })
  );
  return device;
}

export async function addDevice(newDevice: Device): Promise<Device> {
  const addDeviceRequest = `mutation addDevice {
    gnss {
      createDevice(
        input: {Name: "${newDevice.name}", Description: "${newDevice.description}", Coords: {x: "${newDevice.coordinates?.x}", y: "${newDevice.coordinates?.y}", z: "${newDevice.coordinates?.z}"}}
      ){
        device {
          id
          name
          token
          description
          Coords{
            x
            y
            z
          }
        }
      }
    }
  }`;
  const response: any = await grqlFetch(addDeviceRequest);
  const device: Device = await response?.data?.listDevice?.items?.map(
    (item: any) => ({
      id: IdToBigInt(item.id),
      backendID: item.id,
      name: item.name,
      token: item.token,
      description: item.description,
      coordinates: {
        x: item.Coords.x,
        y: item.Coords.y,
        z: item.Coords.z,
      },
    })
  );
  return device;
}

export async function deleteDevice(deleteDevice: Device): Promise<any> {
  const deleteDeviceRequest = `mutation deleteDevice{
    gnss{
      deleteDevice(input:{id:"${deleteDevice.backendID}"}){
        _empty
      }
    }
  }`;
  const response: any = await grqlFetch(deleteDeviceRequest);
  return response;
}

// ---------------------------------------------------------------------

export async function createTask(newTask: task): Promise<any> {
  const createTaskRequest = `mutation createTask{
  gnss{
      createTask(input:{title:"${newTask.name}", description:"${
    newTask.description
  }", startAt: "${newTask.startDataTime.toISOString()}", endAt:"${newTask.endDataTime.toISOString()}", groupingType:${GROUPING_TYPE.get(
    groups.all
  )}, satelliteId: "${newTask.target?.Id}", signalType:${SIGNAL_TYPE.get(
    signals.all
  )}, deviceId:"${newTask.device?.backendID}"}){
        task{
          id
        }
      }
    }
  }`;
  // console.log(createTaskRequest);
  const response: any = await grqlFetch(createTaskRequest);
  // console.log(response);
  return response;
}

export async function getTasks(): Promise<task[]> {
  const getTasksRequest = `query listTask {
    listTask(filter: {}) {
      items {
        id
        title
        description
        satelliteId
        signalType
        groupingType
        startAt
        endAt
        CreatedAt
      }
    }
  }`;

  const response: any = await grqlFetch(getTasksRequest);
  const taskList: task[] = await response?.data?.listTask?.items?.map(
    (item: any) => ({
      // device:
      name: item.title,
      description: item.description,
      id: IdToBigInt(item.id),
      backendID: item.id,
      targetID: item.satelliteId,
      signal: SIGNAL_TYPE.get(item.signalType),
      groupingType: GROUPING_TYPE.get(item.groupingType),
      startDataTime: moment(item.startAt),
      endDataTime: moment(item.endAt),
      // item.CreatedAt
    })
  );
  return taskList;
}

export async function deleteTask(deleteTask: task): Promise<any> {
  const deleteTaskRequest = `mutation deleteTask{
    gnss{
      deleteTask(input:{id:"${deleteTask.backendID}"}){
        _empty
      }
    }
  }`;
  // console.log(deleteTaskRequest);
  const response: any = await grqlFetch(deleteTaskRequest);
  return response;
}

export async function sendTaskToDevice(task: task): Promise<any> {
  // мок запрос на устройство
  axios
    .post("http://localhost:3000/sendTask", { ...task, id: task.backendID })
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// ---------------------------------------------------------------------

export async function signup(newUser: User): Promise<User | null> {
  const signUpRequest = `mutation signup{
  authorization{
      signup(input:{login:"${newUser.name}", password:"${newUser.password}", email: "${newUser.email}", organizationName: "${newUser.company}", firstName: "${newUser.name}", secondName: "${newUser.surname}"}){
        userInfo{
          id
          login
          role
          CreatedAt
        }
      }
    }
  }`;
  const response: any = await grqlFetch(signUpRequest);
  // const { data: { authorization: { signup: { userInfo } } } } = response;
  const userInfo = response?.data?.authorization?.signup?.userInfo;
  // console.log("signup ", userInfo);
  if (!userInfo) return null;
  const user: User = {
    id: userInfo.id,
    email: userInfo.login,
    role: userInfo.role,
    CreatedAt: userInfo.CreatedAt,
  };
  return user;
}

export async function login(user: User): Promise<User | null> {
  const loginRequest = `mutation sigin{
  authorization{
      signin(input:{login:"${user?.email}", password:"${user?.password}"}){
        userInfo{
          id
          login
          role
          CreatedAt
        }
      }
    }
  }`;
  const response: any = await grqlFetch(loginRequest);
  // const { data: { authorization: { signin: { userInfo } } } } = response;
  const userInfo = response?.data?.authorization?.signin?.userInfo;
  // console.log("login ", userInfo);
  if (!userInfo) return null;
  const serverUser: User = {
    id: userInfo?.id,
    email: userInfo?.login,
    role: userInfo?.role,
    CreatedAt: userInfo?.CreatedAt,
  };
  return serverUser;
}

export async function logout(): Promise<void> {
  const logoutRequest = `mutation logout{
    authorization{
      logout(input:{}){
        _empty
      }
    }
  }`;
  const response: any = await grqlFetch(logoutRequest);
  return response;
}

export async function authCheck(): Promise<User | null> {
  const authRequest = `query authCheck {
    authcheck(input: {}) {
      userInfo {
        id
        login
        role
        CreatedAt
      }
    }
  }`;
  const response: any = await grqlFetch(authRequest);
  // const { data: { authcheck: { userInfo } } } = response;
  const userInfo = response?.data?.authcheck?.userInfo;
  // console.log("authCheck ", userInfo);
  if (!userInfo) return null;
  const serverUser: User = {
    id: userInfo?.id,
    email: userInfo?.login,
    role: userInfo?.role,
    CreatedAt: userInfo?.CreatedAt,
  };
  return serverUser;
}

// ---------------------------------------------------------------------

export async function getMeasures(): Promise<Measure[]> {
  const listMeasurementsRequest = `query listMeasurements{
    listMeasurements(filter:{}){
      items{
        id
        token
        startTime
        endTime
        group
        signalType
        target
      }
    }
  }`;
  const response: any = await grqlFetch(listMeasurementsRequest);
  const measures: Measure[] =
    await response?.data?.listMeasurements?.items?.map((item: any) => ({
      id: item.id,
      token: item.token,
      startTime: moment(item.startTime),
      endTime: moment(item.endTime),
      group: item.group,
      signalType: item.signalType,
      target: item.target,
    }));
  return measures;
}

export async function getGraph(id: string): Promise<Measure[]> {
  const listMeasurementsRequest = `query listMeasurements{
    listMeasurements(filter:{id: "${id}"}){
      items{
        id
        token
        startTime
        endTime
        group
        signalType
        target
        dataSpectrum{
          spectrum
          StartFreq
          FreqStep
          startTime
        }
        dataPower{
          power
          startTime
          timeStep
        }
      }
    }
  }`;
  const response: any = await grqlFetch(listMeasurementsRequest);
  const measures: Measure[] =
    await response?.data?.listMeasurements?.items?.map((item: any) => ({
      id: item.id,
      token: item.token,
      startTime: moment(item.startTime),
      endTime: moment(item.endTime),
      group: item.group,
      signalType: item.signalType,
      target: item.target,
      spectrum: item?.dataSpectrum
        ? {
            spectrum: item?.dataSpectrum?.spectrum,
            StartFreq: item?.dataSpectrum?.StartFreq,
            FreqStep: item?.dataSpectrum?.FreqStep,
            startTime: moment(item?.dataSpectrum?.startTime),
          }
        : undefined,
      power: item?.dataPower
        ? {
            power: item?.dataPower?.power,
            startTime: moment(item?.dataPower?.startTime),
            timeStep: moment(item?.dataPower?.timeStep),
          }
        : undefined,
    }));
  // console.log("getGraph", measures);
  return measures;
}


// --------------------------------------------------------------------

export async function getCode(device: Device): Promise<string> {
  const getCodeRequest = `query getCode{
    generateRecieverCode(filter:{token:"${device.token}", typeLang: "python"}){
      programCode
    }
  }`;
  const response: any = await grqlFetch(getCodeRequest);
  const code:string = response?.data?.generateRecieverCode?.programCode;
  return code;
}