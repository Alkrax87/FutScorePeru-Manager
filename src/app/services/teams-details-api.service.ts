import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TeamDetails } from '../interfaces/teamDetails';
import { Environments } from '../environment/environments';

@Injectable({
  providedIn: 'root',
})
export class TeamsDetailsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamsDetails(teamId: string) {
    return this.http.get<TeamDetails>(this.backendUrl + 'details/club/' + teamId);
  }

  addTeamDetails(teamDetails: TeamDetails) {
    return this.http.post<TeamDetails>(this.backendUrl + 'details/club', teamDetails);
  }

  updateTeamDetails(teamId: string, teamDetails: TeamDetails) {
    return this.http.put(this.backendUrl + 'details/club/' + teamId, teamDetails);
  }

  deleteTeamDetails(teamId: string) {
    return this.http.delete(this.backendUrl + 'details/club/' + teamId);
  }
}