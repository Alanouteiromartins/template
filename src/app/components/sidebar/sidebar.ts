import { Component, computed, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '[class.sidebar-is-expanded]': 'isExpanded()',
    '[class.sidebar-mobile-open]': 'isMobileOpen()'
  }
})
export class Sidebar {
  private layoutService = inject(LayoutService);

  isPinned = signal(true);
  isHovered = signal(false);
  isExpanded = computed(() => this.isPinned() || this.isHovered());

  isMobileOpen = this.layoutService.isSidebarMobileOpen;
  isMenu2Open = signal(false);

  togglePin() {
    this.isPinned.update(v => !v);
  }

  toggleMobileMenu() {
    this.layoutService.toggleSidebarMobile();
  }

  toggleMenu2() {
    this.isMenu2Open.update(v => !v);
  }

  onMouseEnter() {
    this.isHovered.set(true);
  }

  onMouseLeave() {
    this.isHovered.set(false);
  }
}
