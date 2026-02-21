import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { TeamDetails } from '../interfaces/teamDetails';

@Injectable({
  providedIn: 'root',
})
export class TeamsDetailsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamsDetails(teamId: string) {
    return this.http.get<TeamDetails>(this.backendUrl + 'teamsDetails/teamId/' + teamId);
  }

  addTeamDetails(teamDetails: TeamDetails) {
    return this.http.post<TeamDetails>(this.backendUrl + 'teamsDetails', teamDetails);
  }

  updateTeamDetails(teamId: string, teamDetails: TeamDetails) {
    return this.http.put(this.backendUrl + 'teamsDetails/' + teamId, teamDetails);
  }

  deleteTeamDetails(teamId: string) {
    return this.http.delete(this.backendUrl + 'teamsDetails/' + teamId);
  }
}