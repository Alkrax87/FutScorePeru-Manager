import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeamProfile } from '../interfaces/team-profile';

@Injectable({
  providedIn: 'root',
})
export class TeamsApiService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  private teamsSubject = new BehaviorSubject<TeamProfile[]>([]);
  dataTeams$ = this.teamsSubject.asObservable();

  getTeams(category: number) {
    this.http.get<TeamProfile[]>(this.backendUrl + 'teams/' + category).subscribe({
      next: (data) => (this.teamsSubject.next(data)),
      error: (err) => (console.error('Failed to fetch teams data: ', err))
    });
  }

  getTeamsByTeamId(category: number, teamId: string) {
    return this.http.get<TeamProfile>(this.backendUrl + 'teams/' + category + '/' + teamId);
  }

  updateTeam(category: number, teamId: string, teamData: any): Observable<any> {
    return this.http.put(this.backendUrl + 'teams/' + category + '/' + teamId, teamData);
  }

  deleteTeam(category: number, teamId: string): Observable<any> {
    return this.http.delete(this.backendUrl + 'teams/' + category + '/' + teamId);
  }
}