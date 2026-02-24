import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LeagueDetails } from '../interfaces/leagueDetails';
import { Environments } from '../environment/environments';

@Injectable({
  providedIn: 'root',
})
export class LeaguesDetailsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getLeagueDetails(leagueId: string) {
    return this.http.get<LeagueDetails>(this.backendUrl + 'leaguesDetails/leagueId/' + leagueId);
  }

  addLeagueDetails(leagueDetails: LeagueDetails) {
    return this.http.post<LeagueDetails>(this.backendUrl + 'leaguesDetails', leagueDetails);
  }

  updateLeagueDetails(leagueId: string, leagueDetails: LeagueDetails) {
    return this.http.put(this.backendUrl + 'leaguesDetails/' + leagueId, leagueDetails);
  }

  deleteLeagueDetails(leagueId: string) {
    return this.http.delete(this.backendUrl + 'leaguesDetails/' + leagueId);
  }
}