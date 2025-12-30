import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { TeamPerformance } from '../interfaces/team-performance';
import { PerformanceData } from '../interfaces/performance-data';

@Injectable({
  providedIn: 'root',
})
export class PerformanceApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamPerformance(category: number, teamId: string) {
    return this.http.get<TeamPerformance>(this.backendUrl + 'performance/category/' + category + '/teamId/' + teamId);
  }

  addPerformance(performance: { teamId: string, category: number }) {
    return this.http.post(this.backendUrl + 'performance', performance);
  }

  updateTeamPerformance(teamId: string, phase: string, performance: PerformanceData) {
    return this.http.put(this.backendUrl + 'performance/' + teamId + '/' + phase, performance)
  }

  deleteTeamPerformance(teamId: string) {
    return this.http.delete(this.backendUrl + 'performance/' + teamId);
  }
}