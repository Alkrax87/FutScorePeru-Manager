import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Stadium } from '../../interfaces/stadium';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StadiumsApiService } from '../../services/stadiums-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stadium-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-5">
      <div class="bg-white p-5 rounded-3xl w-full max-w-sm">
        <form [formGroup]="form" (ngSubmit)="save()">
          @if (stadium) {
            <h3 class="text-xl font-semibold">Edit Stadium</h3>
            <p class="text-neutral-500 text-sm">Update the stadium details below.</p>
          } @else {
            <h3 class="text-xl font-semibold">Add New Stadium</h3>
            <p class="text-neutral-500 text-sm">Enter the details for the new stadium below.</p>
          }
          @if (errorMessage) {
            <div class="flex justify-between bg-red-100 text-red-600 text-sm py-1 rounded-lg px-2 mt-4">
              <p>
                <span class="font-semibold">Error:</span> {{ errorMessage }}
              </p>
              <p (click)="errorMessage = null" class="cursor-pointer">&times;</p>
            </div>
          }
          <div class="flex flex-col gap-2 my-4">
            <!-- StadiumId -->
            <div>
              <label for="stadiumId" class="block text-sm font-semibold mb-1">StadiumId</label>
              <input id="stadiumId" formControlName="stadiumId" type="number" placeholder="stadiumId" min="1"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-semibold mb-1">Name</label>
              <input id="name" formControlName="name" type="text" placeholder="name"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Capacity -->
            <div>
              <label for="capacity" class="block text-sm font-semibold mb-1">Capacity</label>
              <input id="capacity" formControlName="capacity" type="number" placeholder="capacity" min="0"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- Location -->
            <div>
              <label for="location" class="block text-sm font-semibold mb-1">Location</label>
              <input id="location" formControlName="location" type="text" placeholder="location"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
            <!-- ImageUrl -->
            <div>
              <label for="image" class="block text-sm font-semibold mb-1">Image Url</label>
              <input id="image" formControlName="image" type="text" placeholder="image"
                class="border-gray-300 text-neutral-500 border px-3 py-1.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-crimson focus:text-black transition"
              >
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" (click)="close.emit()" class="hover:bg-neutral-100/50 text-neutral-600 border rounded-full px-4 py-2 text-sm duration-300">Cancel</button>
            @if (stadium) {
              <button type="submit" class="bg-yellow-500 hover:bg-yellow-500/80 text-white rounded-full px-4 py-2 text-sm duration-300">
                <fa-icon [icon]="Edit"></fa-icon>&nbsp; Save Changes
              </button>
            } @else {
              <button type="submit" class="bg-green-700 hover:bg-green-700/90 text-white rounded-full px-4 py-2 text-sm duration-300">
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
    stadiumId: [0, [Validators.required, Validators.min(1)]],
    name: [''],
    capacity: [0],
    location: [''],
    image: [''],
  });
  errorMessage: string | null = null;

  Add = faPlus;
  Edit = faPenToSquare;

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
      this.stadiumsService.createStadium(formStadium);
      this.close.emit();
    }
  }
}