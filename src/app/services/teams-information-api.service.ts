import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamInformation } from '../interfaces/team-information';
import { Environments } from '../environment/environments';

@Injectable({
  providedIn: 'root',
})
export class TeamsInformationApiService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  getTeamsByTeamId(teamId: string) {
    return this.http.get<TeamInformation>(this.backendUrl + 'information/club/' + teamId);
  }

  addTeam(teamInformationData: TeamInformation) {
    return this.http.post<TeamInformation>(this.backendUrl + 'information/club', teamInformationData);
  }

  updateTeam(teamId: string, teamInformationData: TeamInformation) {
    return this.http.put(this.backendUrl + 'information/club/' + teamId, teamInformationData);
  }

  deleteTeam(teamId: string) {
    return this.http.delete(this.backendUrl + 'information/club/' + teamId);
  }
}