export interface TeamPerformance {
  teamId: string;
  phase1: {
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    sanction: number;
  },
  phase2: {
    w: number;
    d: number;
    l: number;
    gf: number;
    ga: number;
    sanction: number;
    addition: number;
  }
}