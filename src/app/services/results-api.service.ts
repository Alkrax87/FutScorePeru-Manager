import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { ResultsGenerator, TeamResults } from '../interfaces/team-results';

@Injectable({
  providedIn: 'root',
})
export class ResultsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamResults(teamId: string) {
    return this.http.get<TeamResults>(this.backendUrl + 'results/teamId/' + teamId);
  }

  addResults(resultsGenerator: ResultsGenerator) {
    return this.http.post(this.backendUrl + 'results', resultsGenerator);
  }

  updateTeamResults(teamId: string, phase: number, index: number, score: number) {
    return this.http.put(this.backendUrl + 'results/' + teamId + '/' + phase + '/' + index, { score: score });
  }

  deleteTeamResults(teamId: string) {
    return this.http.delete(this.backendUrl + 'results/' + teamId);
  }
}
