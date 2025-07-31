import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TeamProfile } from '../../interfaces/team-profile';

@Component({
  selector: 'app-team-profile-delete',
  imports: [FontAwesomeModule],
  template: `
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 select-none">
      <div class="bg-white p-5 rounded-xl w-full max-w-sm text-justify">
        <h3 class="text-xl font-semibold mb-2">Delete Team</h3>
        <p class="mb-6 text-neutral-500">
          Are you sure you want to delete <span class="text-black font-bold">{{ updatedTeam.name }}</span>? This will permanently remove all team data and cannot be undone.
        </p>
        <div class="flex justify-center gap-4">
          <button class="bg-neutral-100 hover:bg-neutral-200 w-32 py-2 rounded-xl outline-none" (click)="onCancel()">
            <fa-icon [icon]="Cancel"></fa-icon>&nbsp; Cancel
          </button>
          <button class="bg-red-600 hover:bg-red-500 w-32 text-white py-2 rounded-xl outline-none" (click)="onDelete()">
            <fa-icon [icon]="Delete"></fa-icon>&nbsp; Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TeamProfileDeleteComponent {
  @Input() updatedTeam!: TeamProfile;
  @Output() delete = new EventEmitter<string>()
  @Output() cancel = new EventEmitter<void>()
  Cancel = faXmark;
  Delete = faTrashCan;

  onDelete() { this.delete.emit() }

  onCancel() { this.cancel.emit() }
}