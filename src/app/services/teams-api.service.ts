import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamProfile } from '../interfaces/team-profile';

@Injectable({
  providedIn: 'root',
})
export class TeamsApiService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  getTeams(category: number): Observable<TeamProfile[]> {
    return this.http.get<TeamProfile[]>(this.backendUrl + 'teams/' + category);
  }

  getTeamsByTeamId(category: number, teamId: string): Observable<TeamProfile> {
    return this.http.get<TeamProfile>(this.backendUrl + 'teams/' + category + '/' + teamId);
  }

  updateTeam(category: number, teamId: string, teamData: any): Observable<any> {
    return this.http.put(this.backendUrl + 'teams/' + category + '/' + teamId, teamData);
  }

  deleteTeam(category: number, teamId: string): Observable<any> {
    return this.http.delete(this.backendUrl + 'teams/' + category + '/' + teamId);
  }
}