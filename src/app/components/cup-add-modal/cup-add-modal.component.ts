import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CupsApiService } from '../../services/cups-api.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CupGenerator } from '../../interfaces/cup';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-cup-add-modal',
  imports: [ReactiveFormsModule, FaIconComponent],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-xl">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Add Cup</h3>
          <p class="text-neutral-200 text-sm">Enter the details for new cup below.</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex flex-col gap-4 my-4">
            <!-- CupId -->
            <div>
              <label for="cupId" class="relative">
                <input id="cupId" type="text" formControlName="cupId" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">CupId</span>
              </label>
            </div>
            <!-- Name -->
            <div>
              <label for="name" class="relative">
                <input id="name" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Name</span>
              </label>
            </div>
            <!-- Image -->
            <div>
              <label for="image" class="relative">
                <input id="image" type="text" formControlName="image" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Image</span>
              </label>
            </div>
            <!-- Teams -->
            <div>
              <label for="teams" class="relative">
                <input id="teams" type="number" min="1" formControlName="teams" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Teams</span>
              </label>
            </div>
            <!-- Groups -->
            <div>
              <label for="groups" class="relative">
                <input id="groups" type="number" min="1" formControlName="groups" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Groups</span>
              </label>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            <button type="submit" [disabled]="form.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
              <fa-icon [icon]="Add"></fa-icon>&nbsp; Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class CupAddModalComponent {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private cupsService = inject(CupsApiService);

  form = this.fb.group({
    cupId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    teams: [null as number | null, [Validators.min(1), Validators.required]],
    groups: [null as number | null, [Validators.min(1), Validators.required]],
  });
  errorMessage: string | null = null;

  Add = faPlus;

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const cupData = this.form.value as CupGenerator;

    this.cupsService.addCup(cupData);
    this.close.emit();
  }
}