export interface LastGamesGenerator {
  teamId: string;
  category: number;
  phases: [
    { name: string; size: number },
    { name: string; size: number },
  ];
}