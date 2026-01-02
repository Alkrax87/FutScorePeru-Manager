import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PerformanceApiService } from '../../services/performance-api.service';

@Component({
  selector: 'app-performance-add-modal',
  imports: [FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-sm">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Generate Performance</h3>
        </div>
        <div class="bg-white px-5 pb-5 pt-2">
          <p class="text-sm">Are you sure you want to generate <span class="font-semibold">{{ options.name }}</span> performance?</p>
          <div class="flex justify-end gap-2 mt-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            <button (click)="save()" class="bg-green-600 hover:bg-green-600/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
              <fa-icon [icon]="Add"></fa-icon> Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class PerformanceAddModalComponent {
  @Input() options!: { category: number, teamId: string, name: string };
  @Output() added = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private performanceService = inject(PerformanceApiService);

  Add = faPlus;

  save() {
    this.performanceService.addPerformance({ teamId: this.options.teamId, category: this.options.category}).subscribe({
      next: () => {
        this.added.emit();
        this.close.emit();
      }
    });
  }
}