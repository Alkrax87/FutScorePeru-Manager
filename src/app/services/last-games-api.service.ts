import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamLastGames } from '../interfaces/team-last-games';

@Injectable({
  providedIn: 'root',
})
export class LastGamesApiService {
  private backendURL = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  getTeamLastGames(category: number, teamId: string): Observable<TeamLastGames> {
    return this.http.get<TeamLastGames>(this.backendURL + 'lastgames/' + category + '/' + teamId);
  }

  updateTeamLastGames(category: number, teamId: string, destination: string, option: string): Observable<any> {
    return this.http.put(this.backendURL + 'lastgames/' + category + '/' + teamId + '/' + destination + '/' + option, null);
  }
}
