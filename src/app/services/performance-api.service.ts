import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamPerformance } from '../interfaces/team-performance';

@Injectable({
  providedIn: 'root',
})
export class PerformanceApiService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  getTeamPerformance(category: number, teamId: string): Observable<TeamPerformance> {
    return this.http.get<TeamPerformance>(this.backendUrl + 'performance/' + category + '/' + teamId);
  }

  updateTeamPerformance(category: number, teamId: string, destination: string, performanceData: any): Observable<any> {
    return this.http.put(this.backendUrl + 'performance/' + category + '/' + teamId + '/' + destination, performanceData)
  }
}