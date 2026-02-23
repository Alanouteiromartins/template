import { Component, inject, signal } from '@angular/core';
import { ProfileService, UserProfile } from '../../services/profile.service';
import { ProfileEditModal } from '../../components/profile-edit-modal/profile-edit-modal';

type EditType = 'avatar' | 'info' | 'address' | null;

@Component({
  selector: 'app-profile',
  imports: [ProfileEditModal],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  profileService = inject(ProfileService);

  // Expose signal directly to template for easy reading
  profile = this.profileService.profile;

  // Track which modal is open
  currentEditType = signal<EditType>(null);

  openModal(type: EditType) {
    this.currentEditType.set(type);
  }

  closeModal() {
    this.currentEditType.set(null);
  }

  saveData(updatedData: Partial<UserProfile>) {
    this.profileService.updateProfile(updatedData);
    this.closeModal();
  }

  saveAll() {
    alert('Alterações salvas com sucesso no banco de dados!');
  }
}
