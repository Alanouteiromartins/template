import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification-dropdown',
  imports: [],
  templateUrl: './notification-dropdown.html',
  styleUrl: './notification-dropdown.scss'
})
export class NotificationDropdown {
  @Output() closeDropdown = new EventEmitter<void>();
  notificationService = inject(NotificationService);

  clearAll(event: Event) {
    event.stopPropagation();
    this.notificationService.clearAll();
  }

  onItemClick(id: number) {
    this.notificationService.markAsRead(id);
    // this.closeDropdown.emit(); // Optional: close on click or keep open
  }
}
