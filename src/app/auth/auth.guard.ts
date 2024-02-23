// import { CanActivateFn, ActivatedRouteSnapshot, Router } from "@angular/router";
// import { Injectable } from "@angular/core";
// import { AuthService } from "./auth.service";




// @Injectable()

// export class AuthGuard implements CanActivateFn {

//     constructor(private authService: AuthService, private router: Router) { }

//     canActivate(route: ActivatedRouteSnapshot, state: ActivatedRouteSnapshot) {
//         if (this.authService.isAuth()) {
//             return true;
//         } else {
//             this.router.navigate(['/']);
//         }
//     }

// }



import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuth()) {
      return true;
    } else {
      // 此处使用UrlTree来直接重定向，确保方法总是返回一个值
      return this.router.createUrlTree(['/']);
    }
  }
}
