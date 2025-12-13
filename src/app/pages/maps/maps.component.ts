import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsApiService } from '../../services/maps-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MapUpdateModalComponent } from "../../components/map-update-modal/map-update-modal.component";
import { MapElement } from '../../interfaces/map-element';

@Component({
  selector: 'app-maps',
  imports: [FontAwesomeModule, CommonModule, MapUpdateModalComponent],
  template: `
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-5 pt-24 pb-8 duration-500 select-none">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pb-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Map Management</h2>
          <p class="text-neutral-400">Manage and view all regions status</p>
        </div>
      </div>
      <!-- Content -->
      <div class="flex flex-col gap-8">
        @for (map of maps; track $index) {
          <div class="bg-white rounded-3xl shadow-md hover:shadow-xl duration-300 p-4">
            @switch (map.category) {
              @case (1) {
                <p class="text-gold text-xl font-semibold truncate mb-3">
                  <fa-icon [icon]="Map"></fa-icon> Map - Liga 1
                </p>
              }
              @case (2) {
                <p class="text-gold text-xl font-semibold truncate mb-3">
                  <fa-icon [icon]="Map"></fa-icon> Map - Liga 2
                </p>
              }
              @case (3) {
                <p class="text-gold text-xl font-semibold truncate mb-3">
                  <fa-icon [icon]="Map"></fa-icon> Map - Liga 3
                </p>
              }
              @case (4) {
                <p class="text-gold text-xl font-semibold truncate mb-3">
                  <fa-icon [icon]="Map"></fa-icon> Map - Copa Perú
                </p>
              }
            }
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              @for (mapItem of map.model; track $index) {
                <div class="bg-white border flex items-center gap-2 justify-between shadow-md hover:shadow-xl duration-300 rounded-2xl p-4">
                  <p class="font-semibold text-sm truncate">{{ mapItem.mapName }}</p>
                  <button type="button" (click)="onEdit({ category: map.category, mapName: mapItem.mapName, mapId: mapItem.mapId, mapStatus: mapItem.mapStatus})"
                    class="hover:bg-opacity-85 rounded-full w-24 font-semibold text-sm py-1 text-white duration-300"
                    [ngClass]="{
                      'bg-green-600': mapItem.mapStatus,
                      'bg-red-600': !mapItem.mapStatus
                    }">
                    {{ mapItem.mapStatus ? 'Active' : 'Disabled' }}
                  </button>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>

    @if (showChangeStatusModal()) {
      <app-map-update-modal
        [map]="editedMapItem()!.mapName"
        (update)="changeStatus()"
        (cancel)="showChangeStatusModal.set(false)"
      ></app-map-update-modal>
    }
  `,
  styles: ``,
})
export class MapsComponent {
  private mapsService = inject(MapsApiService);
  maps: MapElement[] = [];

  showChangeStatusModal = signal(false);
  editedMapItem = signal<{ category: number, mapId: string; mapName: string, mapStatus: boolean} | null>(null);

  Map = faMapLocationDot;

  constructor() {
    this.mapsService.getMaps();
    this.mapsService.dataMaps$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => (this.maps = data)
    });
  }

  onEdit(mapItem: { category: number, mapId: string; mapName: string, mapStatus: boolean}) {
    this.showChangeStatusModal.set(true);
    this.editedMapItem.set(mapItem);
  }

  changeStatus() {
    this.mapsService.updateMapItem(this.editedMapItem()!.category, this.editedMapItem()!.mapId, !this.editedMapItem()!.mapStatus);
    this.showChangeStatusModal.set(false);
  }
}