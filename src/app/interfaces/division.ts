export interface Division {
  category: number;
  name: string;
  sup: string;
  image: string;
  teams: number;
  season: number;
  description: string;
  goal: string;
  tags: string[];
  phase1?: { name: string; inGame: number; status: boolean };
  phase2?: { name: string; inGame: number; status: boolean };
  phase3?: { name: string; status: boolean };
}