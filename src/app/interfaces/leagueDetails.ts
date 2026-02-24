export interface LeagueDetails {
  leagueId: string;
  founded: number;
  topChampion: {
    name: string;
    image: string;
    province: string;
    titles: number;
  };
  provincialLeagues: string[];
  historicalChampions: {
    year: number;
    name: string;
    image: string;
    province: string;
  }[];
}