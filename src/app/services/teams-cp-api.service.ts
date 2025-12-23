import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { BehaviorSubject } from 'rxjs';
import { TeamCP } from '../interfaces/team-cp';

@Injectable({
  providedIn: 'root',
})
export class TeamsCPApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private teamsCPSubject = new BehaviorSubject<TeamCP[]>([]);
  dataTeamsCP$ = this.teamsCPSubject.asObservable();

  getTeamsCP() {
    this.http.get<TeamCP[]>(this.backendUrl + 'teamsCP').subscribe({
      next: (data) => this.teamsCPSubject.next(data),
      error: (err) => console.error('Unable to load teamsCP: ', err),
    });
  }

  createTeamCP(teamCP: TeamCP) {
    this.http.post(this.backendUrl + 'teamsCP', teamCP).subscribe({
      next: () => this.getTeamsCP(),
      error: (err) => console.error('Unable to create teamCP: ', err),
    });
  }

  updateTeamCP(teamId: string, teamCP: TeamCP) {
    this.http.put(this.backendUrl + 'teamsCP/' + teamId, teamCP).subscribe({
      next: () => this.getTeamsCP(),
      error: (err) => console.error('Unable to update teamCP: ', err),
    });
  }

  deleteTeamCP(teamId: string) {
    this.http.delete(this.backendUrl + 'teamsCP/' + teamId).subscribe({
      next: () => this.getTeamsCP(),
      error: (err) => console.error('Unable to delete teamCP: ', err),
    });
  }
}