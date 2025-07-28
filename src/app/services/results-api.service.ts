import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { LastGamesGenerator } from '../interfaces/last-games-generator';
import { TeamResults } from '../interfaces/team-results';

@Injectable({
  providedIn: 'root',
})
export class ResultsApiService {
  private backendURL = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  getTeamResults(teamId: string) {
    return this.http.get<TeamResults>(this.backendURL + 'results/teamId/' + teamId);
  }

  addResults(resultsItem: LastGamesGenerator) {
    return this.http.post(this.backendURL + 'results', resultsItem);
  }

  updateTeamResults(teamId: string, phase: string, index: number, score: number) {
    return this.http.put(this.backendURL + 'results/' + teamId + '/' + phase + '/' + index, { score: score });
  }
}
