import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { TeamMatchResultsGenerator, TeamMatchResults } from '../interfaces/teamMatchResults';

@Injectable({
  providedIn: 'root',
})
export class TeamsMatchResultsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamMatchResults(teamId: string) {
    return this.http.get<TeamMatchResults>(this.backendUrl + 'teamsMatchResults/teamId/' + teamId);
  }

  addTeamMatchResults(teamMatchResultsGenerator: TeamMatchResultsGenerator) {
    return this.http.post(this.backendUrl + 'teamsMatchResults', teamMatchResultsGenerator);
  }

  updateTeamMatchResults(teamId: string, phase: number, index: number, score: number) {
    return this.http.put(this.backendUrl + 'teamsMatchResults/' + teamId + '/' + phase + '/' + index, { score: score });
  }

  deleteTeamMatchResults(teamId: string) {
    return this.http.delete(this.backendUrl + 'teamsMatchResults/' + teamId);
  }
}