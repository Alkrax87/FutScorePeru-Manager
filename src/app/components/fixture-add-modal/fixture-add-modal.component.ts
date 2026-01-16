import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FixturesApiService } from '../../services/fixtures-api.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FixtureGenerator } from '../../interfaces/fixture';

@Component({
  selector: 'app-fixture-add-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-xl">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Add Fixture</h3>
          <p class="text-neutral-200 text-sm">Enter category and the number of matches for each phase to generate fixture.</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex gap-4 my-4">
            <!-- Category -->
            <div class="w-1/3">
              <label for="category" class="relative">
                <select id="category" formControlName="category" placeholder="" class="bg-white text-neutral-700 border focus:border-main focus:text-main h-12 cursor-pointer px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                  <option value="" disabled>Choose category</option>
                  <option value="1">Liga 1</option>
                  <option value="2">Liga 2</option>
                  <option value="3">Liga 3</option>
                </select>
                <span class="bg-white text-neutral-400 peer-focus:text-main cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Category</span>
              </label>
            </div>
            <!-- Phase 1 -->
            <div class="w-1/3">
              <label for="phase1" class="relative">
                <input id="phase1" type="number" min="1" formControlName="phase1" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Phase 1</span>
              </label>
            </div>
            <!-- Phase 2 -->
            <div class="w-1/3">
              <label for="phase2" class="relative">
                <input id="phase2" type="number" min="1" formControlName="phase2" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Phase 2</span>
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
export class FixtureAddModalComponent {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private fixturesService = inject(FixturesApiService);

  form = this.fb.group({
    category: [null as number | null],
    phase1: [null as number | null, [Validators.min(1), Validators.required]],
    phase2: [null as number | null, [Validators.min(1), Validators.required]],
  });
  errorMessage: string | null = null;

  Add = faPlus;

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Some fields are invalid';
      return;
    }

    const formLastGames = this.form.value as FixtureGenerator;

    this.fixturesService.addFixture(formLastGames);
    this.close.emit();
  }
}