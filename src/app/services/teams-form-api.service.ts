import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { TeamFormGenerator, TeamForm } from '../interfaces/teamForm';

@Injectable({
  providedIn: 'root',
})
export class TeamsFormApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamForm(teamId: string) {
    return this.http.get<TeamForm>(this.backendUrl + 'teamsForm/teamId/' + teamId);
  }

  addTeamForm(teamFormGenerator: TeamFormGenerator) {
    return this.http.post(this.backendUrl + 'teamsForm', teamFormGenerator);
  }

  updateTeamForm(teamId: string, phase: number, option: string) {
    return this.http.put(this.backendUrl + 'teamsForm/' + teamId + '/' + phase + '/' + option, null);
  }

  deleteTeamForm(teamId: string) {
    return this.http.delete(this.backendUrl + 'teamsForm/' + teamId);
  }
}