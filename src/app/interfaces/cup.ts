export interface CupGenerator {
  cupId: string;
  name: string;
  image: string;
  teams: number;
  groups: number;
}

export interface GroupTeam {
  teamId: string;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  sanction: number;
}

export interface Group {
  name: string;
  teams: GroupTeam[];
}

export interface Cup {
  cupId: string;
  name: string;
  image: string;
  teams: number;
  groups: Group[];
}