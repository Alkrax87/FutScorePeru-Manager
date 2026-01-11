export interface ResultsGenerator {
  teamId: string;
  category: number;
  phase1: number;
  phase2: number;
}

export interface TeamResults {
  teamId: string;
  phase1: (number | null)[];
  phase2: (number | null)[];
}