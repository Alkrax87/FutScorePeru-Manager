import { Injectable } from '@angular/core';
import { Environments } from '../environment/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Division } from '../interfaces/division';

@Injectable({
  providedIn: 'root',
})
export class DivisionsApiService {
  private backendUrl = Environments.backendUrl;

  constructor(private http: HttpClient) {}

  private divisionsSubject = new BehaviorSubject<Division[]>([]);
  dataDivisions$ = this.divisionsSubject.asObservable();

  getDivisions() {
    this.http.get<Division[]>(this.backendUrl + 'divisions').subscribe({
      next: (data) => (this.divisionsSubject.next(data)),
      error: (err) => (console.error('Failed to get Divisions: ', err.error.error)),
    });
  }

  addDivision(division: Division) {
    this.http.post<Division>(this.backendUrl + 'divisions', division).subscribe({
      next: () => (this.getDivisions()),
      error: (err) => (console.error('Failed to add Division: ', err.error.error)),
    });
  }

  updateDivision(division: Division) {
    this.http.put<Division>(this.backendUrl + 'divisions/' + division.divisionId, division).subscribe({
      next: () => (this.getDivisions()),
      error: (err) => (console.error('Failed to update Division: ', err.error.error)),
    });
  }

  deleteDivision(divisionId: number) {
    this.http.delete(this.backendUrl + 'divisions/' + divisionId).subscribe({
      next: () => (this.getDivisions()),
      error: (err) => (console.error('Failed to delete Division: ', err.error.error)),
    });
  }
}