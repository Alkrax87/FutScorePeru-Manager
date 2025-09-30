import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { BehaviorSubject } from 'rxjs';
import { Manager } from '../interfaces/manager';

@Injectable({
  providedIn: 'root',
})
export class ManagersApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private managersSubject = new BehaviorSubject<Manager[]>([]);
  dataManagers$ = this.managersSubject.asObservable();

  getManagers() {
    this.http.get<Manager[]>(this.backendUrl + 'managers').subscribe({
      next: (data) => (this.managersSubject.next(data)),
      error: (err) => (console.error('Failed to get Managers data ', err)),
    });
  }

  addManager(manager: Manager) {
    this.http.post(this.backendUrl + 'managers', manager).subscribe({
      next: () => this.getManagers(),
    });
  }

  updateManager(managerId: number, manager: Manager) {
    this.http.put(this.backendUrl + 'managers/' + managerId, manager).subscribe({
      next: () => this.getManagers(),
    });
  }

  deleteManager(managerId: number) {
    this.http.delete(this.backendUrl + 'managers/' + managerId).subscribe({
      next: () => this.getManagers(),
    });
  }
}