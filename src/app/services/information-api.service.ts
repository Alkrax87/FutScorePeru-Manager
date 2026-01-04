import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TeamInformation } from '../interfaces/team-information';
import { Environments } from '../environment/environments';

@Injectable({
  providedIn: 'root',
})
export class InformationApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  getTeamsInformation(teamId: string) {
    return this.http.get<TeamInformation>(this.backendUrl + 'information/club/' + teamId);
  }

  addInformation(information: TeamInformation) {
    return this.http.post<TeamInformation>(this.backendUrl + 'information/club', information);
  }

  updateInformation(teamId: string, information: TeamInformation) {
    return this.http.put(this.backendUrl + 'information/club/' + teamId, information);
  }

  deleteInformation(teamId: string) {
    return this.http.delete(this.backendUrl + 'information/club/' + teamId);
  }
}