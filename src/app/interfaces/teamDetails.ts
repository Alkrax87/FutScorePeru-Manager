export interface TeamDetails {
  teamId: string;
  category: number;
  description: string;
  founded: number;
  website?: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}