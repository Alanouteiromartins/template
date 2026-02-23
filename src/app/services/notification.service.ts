import { Injectable, signal } from '@angular/core';

export interface NotificationItem {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notifications = signal<NotificationItem[]>([
        {
            id: 1,
            title: 'Novo Relatório Disponível',
            message: 'O relatório financeiro de fevereiro já pode ser acessado.',
            time: 'Há 5 min',
            read: false,
            type: 'info'
        },
        {
            id: 2,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
        {
            id: 3,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
        {
            id: 4,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
        {
            id: 5,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
        {
            id: 6,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
        {
            id: 7,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
        {
            id: 8,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
        {
            id: 9,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
        {
            id: 10,
            title: 'Sistema Atualizado',
            message: 'A nova versão 2.4.0 foi instalada com sucesso.',
            time: 'Há 2 horas',
            read: false,
            type: 'success'
        },
    ]);

    unreadCount = signal<number>(2);

    constructor() {
        this.updateUnreadCount();
    }

    clearAll() {
        this.notifications.set([]);
        this.updateUnreadCount();
    }

    markAsRead(id: number) {
        this.notifications.update(list =>
            list.map(n => n.id === id ? { ...n, read: true } : n)
        );
        this.updateUnreadCount();
    }

    private updateUnreadCount() {
        this.unreadCount.set(this.notifications().filter(n => !n.read).length);
    }
}
