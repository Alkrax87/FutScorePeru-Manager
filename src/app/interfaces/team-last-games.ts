export interface LastGamesGenerator {
  teamId: string;
  category: number;
  phase1: number;
  phase2: number;
}

export interface TeamLastGames {
  teamId: string;
  phase1: string[];
  phase2: string[];
}