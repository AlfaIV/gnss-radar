import grqlFetch from "@utils/grql";
import { Satellite, Device, groups, signals } from "@utils/types/types";
import { task } from "@utils/types/types";
import moment from "moment";

const SIGNAL_TYPE: Map<signals | string, string | signals> = new Map();
SIGNAL_TYPE.set(signals.L1 , "SIGNAL_TYPE_L1");
SIGNAL_TYPE.set(signals.L2 , "SIGNAL_TYPE_L2");
SIGNAL_TYPE.set(signals.all, "SIGNAL_TYPE_UNKNOWN");
SIGNAL_TYPE.set("SIGNAL_TYPE_L1"     , signals.L1);
SIGNAL_TYPE.set("SIGNAL_TYPE_L2"     , signals.L2);
SIGNAL_TYPE.set("SIGNAL_TYPE_UNKNOWN", signals.all);

const GROUPING_TYPE: Map<groups | string, string | groups> = new Map();
GROUPING_TYPE.set(groups.GPS, "GROUPING_TYPE_GPS"        );
GROUPING_TYPE.set(groups.Glonass, "GROUPING_TYPE_GLONASS");
GROUPING_TYPE.set(groups.Galileo, "GROUPING_TYPE_GALILEO");
GROUPING_TYPE.set(groups.Baidou,  "GROUPING_TYPE_BEIDOU" );
GROUPING_TYPE.set(groups.all,     "GROUPING_TYPE_UNKNOWN");
GROUPING_TYPE.set("GROUPING_TYPE_GPS"    ,groups.GPS    );
GROUPING_TYPE.set("GROUPING_TYPE_GLONASS",groups.Glonass);
GROUPING_TYPE.set("GROUPING_TYPE_GALILEO",groups.Galileo);
GROUPING_TYPE.set("GROUPING_TYPE_BEIDOU" ,groups.Baidou );
GROUPING_TYPE.set("GROUPING_TYPE_UNKNOWN",groups.all    );


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

export async function createTask(newTask: task): Promise<any> {
  const createTaskRequest = `mutation createTask{
  gnss{
      createTask(input:{startAt: "${newTask.startDataTime.toISOString()}", endAt:"${
    newTask.endDataTime.toISOString()
  }", groupingType:${GROUPING_TYPE.get(groups.all)}, satelliteId: "${
    newTask.target?.Id
  }", signalType:${SIGNAL_TYPE.get(signals.all)}}){
        task{
          id
        }
      }
    }
  }`;
  console.log(createTaskRequest);
  const response: any = await grqlFetch(createTaskRequest);
  // console.log(response);
  return response;
}


export async function getTasks(): Promise<task[]> {
  const getTasksRequest = `query listTask {
    listTask(filter: {}) {
      items {
        id
        satelliteId
        signalType
        groupingType
        startAt
        endAt
        CreatedAt
      }
    }
  }`
  
  const response: any = await grqlFetch(getTasksRequest);
  const taskList: task[] = await response?.data?.listTask?.items?.map((item: any) => ({
    // device: 
    // name: 
    // description
    id: IdToBigInt(item.id), 
    targetID: item.satelliteId,
    signal: SIGNAL_TYPE.get(item.signalType),
    groupingType: GROUPING_TYPE.get(item.groupingType),
    startDataTime: moment(item.startAt),
    endDataTime: moment(item.endAt),
    // item.CreatedAt
  }))
  return  taskList;
}