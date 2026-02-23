import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-dropdown',
    imports: [],
    templateUrl: './profile-dropdown.html',
    styleUrl: './profile-dropdown.scss'
})
export class ProfileDropdown {
    @Output() closeDropdown = new EventEmitter<void>();
    authService = inject(AuthService);
    router = inject(Router);

    onItemClick() {
        this.closeDropdown.emit();
    }

    profile() {
        setTimeout(() => {
            this.router.navigate(['/perfil']);
            this.closeDropdown.emit();
        }, 300)
    }

    logout() {
        setTimeout(() => {
            this.router.navigate(['/login']);
            this.closeDropdown.emit();
        }, 1000)
        this.authService.logout();
    }
}
