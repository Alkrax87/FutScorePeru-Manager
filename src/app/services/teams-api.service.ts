import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root',
})
export class TeamsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private teamsSubject = new BehaviorSubject<Team[]>([]);
  dataTeams$ = this.teamsSubject.asObservable();

  getTeams() {
    this.http.get<Team[]>(this.backendUrl + 'teams').subscribe({
      next: (data) => this.teamsSubject.next(data),
      error: (err) => console.error('Unable to load teams: ', err),
    });
  }

  getTeamsByTeamId(teamId: string): Observable<Team> {
    return this.http.get<Team>(this.backendUrl + 'teams/teamId/' + teamId);
  }

  addTeam(teamData: Team) {
    this.http.post(this.backendUrl + 'teams', teamData).subscribe({
      next: () => this.getTeams(),
      error: (err) => console.error('Unable to create team: ', err),
    });
  }

  updateTeam(teamId: string, team: Team) {
    this.http.put(this.backendUrl + 'teams/' + teamId, team).subscribe({
      next: () => this.getTeams(),
      error: (err) => console.error('Unable to update team: ', err),
    });
  }

  deleteTeam(teamId: string) {
    this.http.delete(this.backendUrl + 'teams/' + teamId).subscribe({
      next: () => this.getTeams(),
      error: (err) => console.error('Unable to delete team: ', err),
    });
  }
}