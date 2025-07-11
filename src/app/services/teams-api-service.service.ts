import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamsApiServiceService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  getTeams(category: number): Observable<any> {
    return this.http.get(this.backendUrl + 'teams/' + category);
  }

  getTeamsByTeamId(category: number, teamId: string): Observable<any> {
    return this.http.get(this.backendUrl + 'teams/' + category + '/' + teamId);
  }

  updateTeam(category: number, teamId: string, teamData: any): Observable<any> {
    return this.http.put(this.backendUrl + 'teams/' + category + '/' + teamId, teamData);
  }

  deleteTeam(category: number, teamId: string): Observable<any> {
    return this.http.delete(this.backendUrl + 'teams/' + category + '/' + teamId);
  }
}