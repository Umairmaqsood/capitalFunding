import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);

  getSidebarState() {
    return this.sidebarOpen.asObservable();
  }

  toggleSidebar(state: boolean) {
    this.sidebarOpen.next(state);
  }
}
