import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { AuthService } from 'src/app/auth/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth$: Observable<boolean> | undefined;
  authSubscription: Subscription | undefined;

  constructor(private store: Store<fromRoot.State>) { }
  

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // })
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav () {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
  


}
