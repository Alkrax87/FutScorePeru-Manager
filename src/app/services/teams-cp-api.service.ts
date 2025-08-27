import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { BehaviorSubject } from 'rxjs';
import { TeamCP } from '../interfaces/team-cp';

@Injectable({
  providedIn: 'root',
})
export class TeamsCPApiService {
  private backendUrl = Environments.backendUrl;

  // constructor(private http: HttpClient) {}

  private http = inject(HttpClient);

  private teamsCPSubject = new BehaviorSubject<TeamCP[]>([]);
  dataTeamsCP$ = this.teamsCPSubject.asObservable();

  getTeamsCP() {
    this.http.get<TeamCP[]>(this.backendUrl + 'teamsCP').subscribe({
      next: (data) => this.teamsCPSubject.next(data),
    });
  }

  createTeamCP(teamCP: TeamCP) {
    this.http.post(this.backendUrl + 'teamsCP', teamCP).subscribe({
      next: () => this.getTeamsCP(),
    });
  }

  updateTeamCP(teamId: string, teamCP: TeamCP) {
    this.http.put(this.backendUrl + 'teamsCP/' + teamId, teamCP).subscribe({
      next: () => this.getTeamsCP(),
    });
  }

  deleteTeamCP(teamId: string) {
    this.http.delete(this.backendUrl + 'teamsCP/' + teamId).subscribe({
      next: () => this.getTeamsCP(),
    });
  }
}