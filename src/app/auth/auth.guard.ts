import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard {

  static authGuardFn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.user.pipe(
      take(1),
      map(user => {
      const isAuth = !!user;
      if(isAuth) {
        console.log('Guard');
        console.log(router.routerState.snapshot.url);
        return true;
      }
      console.log('User is not authenticated');
      return router.createUrlTree(['/auth']);

    }));
  }

}

