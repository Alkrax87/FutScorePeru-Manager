export interface Division {
  divisionId: number;
  sup: string;
  name: string;
  image: string;
  season: number;
  teams: number;
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