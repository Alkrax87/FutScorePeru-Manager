export interface TeamInformation {
  teamId: string;
  foundation: number;
  background: string;
  website?: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}