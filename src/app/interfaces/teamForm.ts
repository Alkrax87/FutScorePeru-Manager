export interface TeamFormGenerator {
  teamId: string;
  category: number;
  phase1: number;
  phase2: number;
}

export interface TeamForm {
  teamId: string;
  phase1: string[];
  phase2: string[];
}