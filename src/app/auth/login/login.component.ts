import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading$: Observable<boolean> | undefined; //$-表示NPR控制

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }
  
  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading); //调用app.reducer查看loading状态
    // this.store.subscribe(data => {console.log(data)});
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
