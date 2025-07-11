import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StadiumsApiServiceService {
  private BackendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  getStadiums(): Observable<any> {
    return this.http.get(this.BackendUrl + 'stadiums');
  }
}