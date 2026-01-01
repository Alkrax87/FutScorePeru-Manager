import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { LastGamesGenerator, TeamLastGames } from '../interfaces/team-last-games';

@Injectable({
  providedIn: 'root',
})
export class LastGamesApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamLastGames(teamId: string) {
    return this.http.get<TeamLastGames>(this.backendUrl + 'lastgames/teamId/' + teamId);
  }

  addLastGames(lastGamesGenerator: LastGamesGenerator) {
    return this.http.post(this.backendUrl + 'lastgames', lastGamesGenerator);
  }

  updateTeamLastGames(teamId: string, phase: number, option: string) {
    return this.http.put(this.backendUrl + 'lastgames/' + teamId + '/' + phase + '/' + option, null);
  }

  deleteTeamLastGames(teamId: string) {
    return this.http.delete(this.backendUrl + 'lastgames/' + teamId);
  }
}