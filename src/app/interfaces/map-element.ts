export interface Map {
  category: number;
  model: MapElement[];
}

export interface MapElement {
  mapId: string;
  mapName: string;
  mapStatus: boolean;
  mapD: string;
}