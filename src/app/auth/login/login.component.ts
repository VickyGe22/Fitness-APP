import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading$: Observable<boolean> | undefined; //$-表示NPR控制

  constructor(private authService: AuthService, private store: Store<{ui: fromApp.State}>) { }
  
  ngOnInit() {
    this.isLoading$ = this.store.pipe(
      select(state => state.ui.isLoading)
    );
    // this.store.subscribe(data => {console.log(data)});
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
