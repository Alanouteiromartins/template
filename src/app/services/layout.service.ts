import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    isSidebarMobileOpen = signal(false);

    toggleSidebarMobile() {
        this.isSidebarMobileOpen.update(v => !v);
    }

    closeSidebarMobile() {
        this.isSidebarMobileOpen.set(false);
    }
}
