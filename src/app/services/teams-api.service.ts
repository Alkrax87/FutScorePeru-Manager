import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TeamProfile } from '../interfaces/team-profile';

@Injectable({
  providedIn: 'root',
})
export class TeamsApiService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  private teamsSubject = new BehaviorSubject<TeamProfile[]>([]);
  dataTeams$ = this.teamsSubject.asObservable();

  getTeams() {
    this.http.get<TeamProfile[]>(this.backendUrl + 'teams/').subscribe({
      next: (data) => (this.teamsSubject.next(data)),
      error: (err) => {
        console.error('Failed to fetch teams data: ', err);
        this.teamsSubject.next([]);
      }
    });
  }

  getTeamsByTeamId(teamId: string) {
    return this.http.get<TeamProfile>(this.backendUrl + 'teams/teamId/' + teamId);
  }

  addTeam(teamData: TeamProfile) {
    return this.http.post<TeamProfile>(this.backendUrl + 'teams', teamData);
  }

  updateTeam(teamId: string, teamData: TeamProfile) {
    return this.http.put(this.backendUrl + 'teams/' + teamId, teamData);
  }

  deleteTeam(teamId: string) {
    return this.http.delete(this.backendUrl + 'teams/' + teamId);
  }
}