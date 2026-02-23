import { Component, OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfile } from '../../services/profile.service';

@Component({
    selector: 'app-profile-edit-modal',
    imports: [ReactiveFormsModule],
    templateUrl: 'profile-edit-modal.html',
    styleUrl: 'profile-edit-modal.scss'
})
export class ProfileEditModal implements OnInit {
    editType = input.required<'avatar' | 'info' | 'address'>();
    currentProfile = input.required<UserProfile>();

    closeModal = output<void>();
    saveData = output<Partial<UserProfile>>();

    fb = inject(FormBuilder);
    editForm!: FormGroup;

    // Pre-selected avatars simply defined statically
    preselectedAvatars = [
        'https://i.pravatar.cc/150?img=11',
        'https://i.pravatar.cc/150?img=33',
        'https://i.pravatar.cc/150?img=47'
    ];
    selectedAvatarUrl: string = '';

    ngOnInit() {
        this.selectedAvatarUrl = this.currentProfile().avatarUrl;

        if (this.editType() === 'info') {
            this.editForm = this.fb.group({
                name: [this.currentProfile().name, Validators.required],
                email: [this.currentProfile().email, [Validators.required, Validators.email]],
                phone: [this.currentProfile().phone],
                cpf: [this.currentProfile().cpf],
                role: [this.currentProfile().role, Validators.required]
            });
        } else if (this.editType() === 'address') {
            this.editForm = this.fb.group({
                street: [this.currentProfile().street, Validators.required],
                number: [this.currentProfile().number],
                neighborhood: [this.currentProfile().neighborhood],
                city: [this.currentProfile().city, Validators.required],
                state: [this.currentProfile().state, [Validators.required, Validators.maxLength(2)]],
                country: [this.currentProfile().country],
                cep: [this.currentProfile().cep]
            });
        }
    }

    onAvatarSelect(url: string) {
        this.selectedAvatarUrl = url;
    }

    onOverlayClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('modal-overlay')) {
            this.onClose();
        }
    }

    onClose() {
        this.closeModal.emit();
    }

    onSubmit() {
        if (this.editType() === 'avatar') {
            this.saveData.emit({ avatarUrl: this.selectedAvatarUrl });
            return;
        }

        if (this.editForm.valid) {
            this.saveData.emit(this.editForm.value);
        } else {
            this.editForm.markAllAsTouched();
        }
    }
}
