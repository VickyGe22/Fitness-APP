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
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, Route } from "@angular/router";
import { Observable } from "rxjs";
// import { AuthService } from "./auth.service";

import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';

import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard {

  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   // 此处使用UrlTree来直接重定向，确保方法总是返回一个值
    //   return this.router.createUrlTree(['/']);
    // }
  }

  canLoad(route: Route){
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

}
