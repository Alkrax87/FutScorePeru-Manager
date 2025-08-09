import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../interfaces/manager';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagersApiService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  private managersSubject = new BehaviorSubject<Manager[]>([]);
  dataManagers$ = this.managersSubject.asObservable();

  getManagers() {
    this.http.get<Manager[]>(this.backendUrl + 'managers').subscribe({
      next: (data) => (this.managersSubject.next(data)),
      error: (err) => (console.error('Failed to get Managers data ', err)),
    });
  }

  addManager(manager: Manager) {
    return this.http.post(this.backendUrl + 'managers', manager);
  }

  updateManager(managerId: number, manager: Manager) {
    return this.http.put(this.backendUrl + 'managers/' + managerId, manager);
  }

  deleteManager(managerId: number) {
    return this.http.delete(this.backendUrl + 'managers/' + managerId);
  }
}