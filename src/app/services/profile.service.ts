import { Injectable, signal } from '@angular/core';

export interface UserProfile {
    // Avatar
    avatarUrl: string;
    name: string;
    // Info
    email: string;
    phone: string;
    cpf: string;
    role: string;
    // Address
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string; // 2 letters
    country: string;
    cep: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    profile = signal<UserProfile>({
        avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        name: 'Alan Martins',
        email: 'alanoutmartins@gmail.com',
        phone: '(11) 98765-4321',
        cpf: '123.456.789-00',
        role: 'Administrador',
        street: 'Avenida Paulista',
        number: '1578',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        cep: '01310-200'
    });

    updateProfile(updates: Partial<UserProfile>) {
        this.profile.update(current => ({ ...current, ...updates }));
    }
}
