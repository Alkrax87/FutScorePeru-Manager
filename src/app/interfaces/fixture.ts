export interface FixtureGenerator {
  category: number;
  phase1: number;
  phase2: number;
}

export interface Match {
  home: string;
  away: string;
  postponed: boolean;
  date: Date | null;
}

export interface Matchday {
  round: number;
  matches: Match[];
}

export interface Fixture {
  category: number;
  phase1: Matchday[];
  phase2: Matchday[];
}