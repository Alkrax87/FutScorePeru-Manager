export interface TeamProfile {
  teamId: string;
  category: number;
  groupFirstPhase?: string;
  groupSecondPhase?: string;
  name: string;
  abbreviation: string;
  image: string;
  imageThumbnail: string;
  alt: string;
  location: string;
  stadium: number;
  color: {
    c1: string;
    c2?: string;
  };
}