import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../environment/environments';
import { BehaviorSubject } from 'rxjs';
import { MapElement } from '../interfaces/map-element';

@Injectable({
  providedIn: 'root',
})
export class MapsApiService {
  private backendUrl = Environments.backendUrl;

  private http = inject(HttpClient);

  private mapsSubject = new BehaviorSubject<MapElement[]>([]);
  dataMaps$ = this.mapsSubject.asObservable();

  getMaps() {
    this.http.get<MapElement[]>(this.backendUrl + 'map').subscribe({
      next: (data) => this.mapsSubject.next(data),
      error: (err) => console.error('Unable to load maps: ', err),
    });
  }

  updateMapItem(category: number, mapId: string, newStatus: boolean) {
    this.http.put(this.backendUrl + 'map/category/' + category + '/mapId/' + mapId, { mapStatus: newStatus }).subscribe({
      next: () => this.getMaps(),
      error: (err) => console.error('Unable to update map item: ', err.error.error),
    });
  }
}