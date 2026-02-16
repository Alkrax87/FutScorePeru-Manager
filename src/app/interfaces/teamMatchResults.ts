export interface TeamMatchResultsGenerator {
  teamId: string;
  category: number;
  phase1: number;
  phase2: number;
}

export interface TeamMatchResults {
  teamId: string;
  phase1: (number | null)[];
  phase2: (number | null)[];
}