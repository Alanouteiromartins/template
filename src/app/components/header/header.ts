import { Component, ElementRef, HostListener, signal, inject } from '@angular/core';
import { ProfileDropdown } from '../profile-dropdown/profile-dropdown';
import { LayoutService } from '../../services/layout.service';
import { NotificationDropdown } from '../notification-dropdown/notification-dropdown';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  imports: [ProfileDropdown, NotificationDropdown],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  layoutService = inject(LayoutService);
  notificationService = inject(NotificationService);

  isDropdownOpen = signal(false);
  isNotificationOpen = signal(false);

  constructor(private elementRef: ElementRef) { }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update(prev => !prev);
    this.isNotificationOpen.set(false);
  }

  toggleNotification(event: Event) {
    event.stopPropagation();
    this.isNotificationOpen.update(prev => !prev);
    this.isDropdownOpen.set(false);
  }

  toggleSidebarMobile() {
    this.layoutService.toggleSidebarMobile();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isDropdownOpen() || this.isNotificationOpen()) {
      const clickedProfile = this.elementRef.nativeElement.querySelector('.profile-container')?.contains(event.target);
      const clickedNotification = this.elementRef.nativeElement.querySelector('.notification-container')?.contains(event.target);

      if (!clickedProfile && this.isDropdownOpen()) {
        this.isDropdownOpen.set(false);
      }

      if (!clickedNotification && this.isNotificationOpen()) {
        this.isNotificationOpen.set(false);
      }
    }
  }
}
