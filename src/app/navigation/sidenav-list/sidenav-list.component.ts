import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy{
  
    @Output() closeSidenav = new EventEmitter<void>();

    isAuth$: Observable<boolean> | undefined;
    authSubscription: Subscription | undefined;
  
    constructor(private store: Store<fromRoot.State>, private authService:AuthService) { }
  

    ngOnInit() {
      // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      //   this.isAuth = authStatus;
      // })
      this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }
  
    onClose() {
      this.closeSidenav.emit();
    }

    ngOnDestroy(): void {
      this.authSubscription?.unsubscribe();
    }

    onLogout() {
      this.onClose();
      this.authService.logout();
    }

}
