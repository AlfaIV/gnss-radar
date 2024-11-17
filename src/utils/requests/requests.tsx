import grqlFetch from "@utils/grql";
import { Satellite, Device } from "@utils/types/types";

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
  const satellites: Satellite[] = await response?.data?.listSatellites?.items?.map((item: any) => ({
    Id: item.Id,
    Name: item.SatelliteName
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
  const devices: Device[] = await response?.data?.listDevice?.items?.map((item: any) => ({
    // id: BigInt(item.id.replace(/\D/g, '')),
    id: item.id,
    name: item.name,
    token: item.token,
    description: item.description,
    coordinates: {
      x: item.Coords.x,
      y: item.Coords.y,
      z: item.Coords.z
    }
  }));
  return devices;
}