import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink, FontAwesomeModule, RouterLinkActive],
  template: `
    <div class="bg-night h-screen duration-300 fixed select-none z-50" [ngClass]="{ 'w-52': isOpen, 'w-14': !isOpen }">
      <!-- Title -->
      <div class="px-2">
        <div routerLink="/" class="flex items-center gap-2 rounded-lg cursor-pointer outline-none duration-300 h-14">
          <img loading="lazy" src="https://placehold.co/40x40" alt="BRAND-logo" class="rounded-md duration-300 w-10 h-10">
          @if (isOpen) {
            <p class="text-white text-xl truncate"><span class="font-bold text-crimson">FSP</span>Manager</p>
          }
        </div>
      </div>
      <!-- Button -->
      <div class="relative">
        <div (click)="changeSidebarStatus()" class="bg-crimson hover:bg-crimson-hover text-white cursor-pointer flex justify-center items-center w-8 h-8 absolute rounded-full -top-4 -right-4">
          <fa-icon class="duration-300" [icon]="ArrowClose" [ngClass]="{ 'rotate-180' : isOpen}"></fa-icon>
        </div>
      </div>
      <!-- Divider -->
      <div class="bg-neutral-700 h-0.5"></div>
      <!-- Menu -->
      <div class="text-white flex flex-col gap-4 h-full py-3 px-2">
        @for (section of routesElements; track $index) {
          <div>
            @if (isOpen) {
              <p class="text-gold text-xs px-2 mb-1 truncate">{{ section.sectionName }}</p>
            } @else {
              <div class="place-content-center h-4 mb-1">
                <div class="bg-neutral-600 rounded-full h-0.5"></div>
              </div>
            }
            <div class="flex flex-col gap-1">
              @for (route of section.routes; track $index) {
                <div [routerLink]="route.route" [routerLinkActive]="['bg-crimson']" class="hover:bg-crimson flex gap-2 cursor-pointer pl-4 pr-2 py-2 -ml-2 rounded-r-full duration-300">
                  <div class="min-w-5 max-w-5 text-center">
                    <fa-icon [icon]="route.icon"></fa-icon>
                  </div>
                  @if (isOpen) {
                    <p class="truncate">{{ route.name }}</p>
                  }
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class SidebarComponent {
  @Input() routesElements: { sectionName: string; routes: { route: string; name: string; icon: IconDefinition }[] }[] = [];
  @Output() sidebarOpen = new EventEmitter<boolean>();

  isOpen: boolean = true;

  // Icons
  ArrowClose = faAngleRight;

  changeSidebarStatus() {
    this.isOpen = !this.isOpen;
    this.sidebarOpen.emit(this.isOpen);
  }
}
