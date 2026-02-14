import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { TeamPerformance } from '../interfaces/teamPerformance';

@Injectable({
  providedIn: 'root',
})
export class TeamsPerformanceApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamPerformance(teamId: string) {
    return this.http.get<TeamPerformance>(this.backendUrl + 'teamsPerformance/teamId/' + teamId);
  }

  addTeamPerformance(performance: { teamId: string, category: number }) {
    return this.http.post(this.backendUrl + 'teamsPerformance', performance);
  }

  updateTeamPerformance(teamId: string, performance: TeamPerformance) {
    return this.http.put(this.backendUrl + 'teamsPerformance/' + teamId, performance)
  }

  deleteTeamPerformance(teamId: string) {
    return this.http.delete(this.backendUrl + 'teamsPerformance/' + teamId);
  }
}