import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  // title = 'FitnessTrack';
  // onNav = false;

  constructor(private authService: AuthService){}
  
  ngOnInit() {
    this.authService.isAuthListener();
  } //让用户必须登录才能进入其他界面

  // onNavigate() {
  //   this.onNav = true;
  // }

}
