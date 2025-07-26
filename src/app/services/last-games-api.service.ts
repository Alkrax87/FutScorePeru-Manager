import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { TeamLastGames } from '../interfaces/team-last-games';
import { LastGamesGenerator } from '../interfaces/last-games-generator';

@Injectable({
  providedIn: 'root',
})
export class LastGamesApiService {
  private backendURL = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  getTeamLastGames(teamId: string) {
    return this.http.get<TeamLastGames>(this.backendURL + 'lastgames/teamId/' + teamId);
  }

  addLastGames(lastGamesItem: LastGamesGenerator) {
    return this.http.post(this.backendURL + 'lastgames', lastGamesItem);
  }

  updateTeamLastGames(teamId: string, phase: string, option: string) {
    return this.http.put(this.backendURL + 'lastgames/' + teamId + '/' + phase + '/' + option, null);
  }
}