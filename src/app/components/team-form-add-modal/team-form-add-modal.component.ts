import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamsFormApiService } from '../../services/teams-form-api.service';
import { TeamFormGenerator } from '../../interfaces/teamForm';

@Component({
  selector: 'app-team-form-add-modal',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center select-none px-3">
      <div class="bg-crimson rounded-3xl overflow-hidden w-full max-w-sm">
        <div class="p-5">
          <h3 class="text-white text-xl font-semibold">Generate Team Form</h3>
          <p class="text-neutral-200 text-sm">Enter the number of games for each phase to generate form.</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="save()" class="bg-white px-5 pb-5 pt-2">
          <div class="flex gap-4 my-4">
            <!-- Phase 1 -->
            <div>
              <label for="phase1" class="relative">
                <input id="phase1" type="number" min="1" formControlName="phase1" placeholder="" autocomplete="false" class="bg-white text-neutral-700 border focus:border-crimson focus:text-crimson h-12 cursor-text px-5 py-2 peer w-full rounded-full shadow-sm duration-100 outline-none">
                <span class="bg-white text-neutral-400 peer-focus:text-crimson cursor-text flex items-center -translate-y-6 absolute inset-y-0 start-3 px-2 text-xs font-semibold transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6">Phase 1</span>
              </label>
            </div>
            <!-- Phase 2 -->
            <div>
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
export class TeamFormAddModalComponent {
  @Input() teamReference!: { teamId: string, category: number };
  @Output() updated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private teamsFormService = inject(TeamsFormApiService);

  form = this.fb.group({
    teamId: [null as string | null],
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

    const formTeamForm = this.form.value as TeamFormGenerator;
    formTeamForm.teamId = this.teamReference.teamId;
    formTeamForm.category = this.teamReference.category;

    this.teamsFormService.addTeamForm(formTeamForm).subscribe({
      next: () => {
        this.updated.emit();
        this.close.emit();
      },
    });
  }
}