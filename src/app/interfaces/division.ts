export interface Division {
  divisionId: number;
  name: string;
  sup: string;
  image: string;
  teams: number;
  season: number;
  firstPhase: {
    name: string;
    inGame: number;
    status: boolean;
  };
  secondPhase: {
    name: string;
    inGame: number;
    status: boolean;
  };
  thirdPhase: {
    name: string;
    status: boolean;
  };
  brackets: {
    bracket32?: {
      name: string;
      status: boolean;
    };
    bracket16?: {
      name: string;
      status: boolean;
    };
    bracket8?: {
      name: string;
      status: boolean;
    };
    bracket4?: {
      name: string;
      status: boolean;
    };
    bracket2?: {
      name: string;
      status: boolean;
    };
    bracket1?: {
      name: string;
      status: boolean;
    };
    bracketExtra?: {
      name: string;
      status: boolean;
    };
  };
}