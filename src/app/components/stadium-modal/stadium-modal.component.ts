import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Stadium } from '../../interfaces/stadium';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StadiumsApiService } from '../../services/stadiums-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stadium-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-sm">
        <div class="p-5">
          @if (stadium) {
            <h3 class="text-white text-xl font-semibold">Edit Stadium</h3>
            <p class="text-neutral-200 text-sm">Update the stadium details below.</p>
          } @else {
            <h3 class="text-white text-xl font-semibold">Add New Stadium</h3>
            <p class="text-neutral-200 text-sm">Enter the details for the new stadium below.</p>
          }
          @if (errorMessage) {
            <div class="flex justify-between bg-red-100 text-red-600 text-sm py-1 rounded-lg px-2 mt-4">
              <p>
                <span class="font-semibold">Error:</span> {{ errorMessage }}
              </p>
              <p (click)="errorMessage = null" class="cursor-pointer">&times;</p>
            </div>
          }
        </div>
        <form [formGroup]="form" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex flex-col gap-4 my-4">
            <!-- StadiumId -->
            <div>
              <label for="stadiumId" class="relative">
                <input id="stadiumId" type="number" min="1" formControlName="stadiumId" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">StadiumId</span>
              </label>
            </div>
            <!-- Name -->
            <div>
              <label for="name" class="relative">
                <input id="name" type="text" formControlName="name" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Name</span>
              </label>
            </div>
            <!-- Capacity -->
            <div>
              <label for="capacity" class="relative">
                <input id="capacity" type="number" min="0" formControlName="capacity" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Capacity</span>
              </label>
            </div>
            <!-- Location -->
            <div>
              <label for="location" class="relative">
                <input id="location" type="text" formControlName="location" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Location</span>
              </label>
            </div>
            <!-- ImageUrl -->
            <div>
              <label for="image" class="relative">
                <input id="image" type="text" formControlName="image" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Image URL</span>
              </label>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/80 text-neutral-600 border rounded-full px-6 py-2 text-sm duration-300">Cancel</button>
            @if (stadium) {
              <button type="submit" [disabled]="form.invalid" class="bg-yellow-500 hover:bg-yellow-500/80 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Save"></fa-icon>&nbsp; Save Changes
              </button>
            } @else {
              <button type="submit" [disabled]="form.invalid" class="bg-green-700 hover:bg-green-700/90 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-2 text-sm duration-300">
                <fa-icon [icon]="Add"></fa-icon>&nbsp; Add Team
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class StadiumModalComponent {
  @Input() stadium: Stadium | null = null;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private stadiumsService = inject(StadiumsApiService);

  form = this.fb.group({
    stadiumId: [null as number | null, [Validators.required, Validators.min(1)]],
    name: ['', Validators.required],
    capacity: [null as number | null, [Validators.required, Validators.min(0)]],
    location: ['', Validators.required],
    image: ['', Validators.required],
  });
  errorMessage: string | null = null;

  Add = faPlus;
  Save = faFloppyDisk;

  ngOnInit() {
    if (this.stadium) {
      this.form.patchValue(this.stadium);
    }
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formStadium = this.form.value as Stadium;

    if (this.stadium?.stadiumId) {
      this.stadiumsService.updateStadium(this.stadium.stadiumId, formStadium);
      this.close.emit();
    } else {
      this.stadiumsService.addStadium(formStadium);
      this.close.emit();
    }
  }
}