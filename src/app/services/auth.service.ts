import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Signal to hold the current auth state
    isAuthenticated = signal<boolean>(false);

    constructor() {
        // Check local storage on initialization (mock persistence)
        const token = localStorage.getItem('mock_token');
        if (token) {
            this.isAuthenticated.set(true);
        }
    }

    login(email: string, pass: string): boolean {
        // Mock validation per user request
        if (email === 'alanoutmartins@gmail.com' && pass === '93298822') {
            localStorage.setItem('mock_token', 'logged_in_virtual_token');
            this.isAuthenticated.set(true);
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('mock_token');
        this.isAuthenticated.set(false);
    }
}
