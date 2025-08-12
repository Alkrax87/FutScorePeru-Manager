import { Component } from '@angular/core';
import { MapsApiService } from '../../services/maps-api.service';
import { MapElement } from '../../interfaces/map-element';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MapUpdateModalComponent } from "../../components/map-update-modal/map-update-modal.component";

@Component({
  selector: 'app-maps',
  imports: [FontAwesomeModule, CommonModule, MapUpdateModalComponent],
  template: `
    <div class="px-5 xl:px-32 py-5 sm:py-10 select-none">
      <!-- Title -->
      <div class="pb-4 flex flex-col sm:flex-row justify-between gap-4">
        <div class="text-center sm:text-start">
          <h2 class="text-3xl font-semibold">Map Management</h2>
          <p class="text-neutral-500">Manage and view all maps</p>
        </div>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 gap-4">
        @for (map of maps; track $index) {
          <div class="border border-neutral-200 rounded-xl overflow-hidden shadow-md p-4">
            @switch (map.category) {
              @case (1) {
                <p class="text-xl font-semibold truncate mb-3">
                  <fa-icon [icon]="Map"></fa-icon> Map - Liga 1
                </p>
              }
              @case (2) {
                <p class="text-xl font-semibold truncate mb-3">
                  <fa-icon [icon]="Map"></fa-icon> Map - Liga 2
                </p>
              }
              @case (3) {
                <p class="text-xl font-semibold truncate mb-3">
                  <fa-icon [icon]="Map"></fa-icon> Map - Liga 3
                </p>
              }
              @case (4) {
                <p class="text-xl font-semibold truncate mb-3">
                  <fa-icon [icon]="Map"></fa-icon> Map - Copa Perú
                </p>
              }
            }
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              @for (mapItem of map.model; track $index) {
                <div class="flex gap-2 justify-between border rounded-lg px-4 py-2 grid-cols-1">
                  <div>
                    <p class="text-neutral-400 text-xs">TeamID: {{ mapItem.mapId }}</p>
                    <p class="font-semibold">{{ mapItem.mapName }}</p>
                  </div>
                  <button (click)="onEdit({ category: map.category, mapName: mapItem.mapName, mapId: mapItem.mapId, mapStatus: mapItem.mapStatus})" class="border rounded-lg w-20 font-semibold px-2 text-sm duration-300" [ngClass]="{ 'bg-crimson hover:bg-opacity-90 text-white': mapItem.mapStatus}">
                    {{ mapItem.mapStatus ? 'Active' : 'Disabled' }}
                  </button>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>

    @if (showChangeStatusModal) {
      <app-map-update-modal
        [map]="editedMapItem.mapName"
        (update)="changeStatus()"
        (cancel)="showChangeStatusModal = false"
      ></app-map-update-modal>
    }
  `,
  styles: ``,
})
export class MapsComponent {
  constructor(private mapsService: MapsApiService) {}

  maps: MapElement[] = [];
  editedMapItem!: { category: number, mapId: string; mapName: string, mapStatus: boolean};

  Map = faMapLocationDot;

  showChangeStatusModal = false;

  ngOnInit() {
    this.mapsService.getMaps();
    this.mapsService.dataMaps$.subscribe({
      next: (data) => (this.maps = data)
    });
  }

  onEdit(mapItem: { category: number, mapId: string; mapName: string, mapStatus: boolean}) {
    this.showChangeStatusModal = true;
    this.editedMapItem = mapItem;
  }

  changeStatus() {
    this.mapsService.updateMapItem(this.editedMapItem.category, this.editedMapItem.mapId, !this.editedMapItem.mapStatus);
    this.showChangeStatusModal = false;
  }
}
