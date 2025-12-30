import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { TeamResults } from '../interfaces/team-results';
import { LastGamesGenerator } from '../interfaces/last-games-generator';

@Injectable({
  providedIn: 'root',
})
export class ResultsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamResults(teamId: string) {
    return this.http.get<TeamResults>(this.backendUrl + 'results/teamId/' + teamId);
  }

  addResults(resultsItem: LastGamesGenerator) {
    return this.http.post(this.backendUrl + 'results', resultsItem);
  }

  updateTeamResults(teamId: string, phase: string, index: number, score: number) {
    return this.http.put(this.backendUrl + 'results/' + teamId + '/' + phase + '/' + index, { score: score });
  }

  deleteTeamResults(teamId: string) {
    return this.http.delete(this.backendUrl + 'results/' + teamId);
  }
}
