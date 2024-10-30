import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () :boolean => {
  let isAuth :UserService = inject(UserService);
  let  router :Router = inject(Router);
  if (isAuth && isAuth.isAuthenticated()){
    return true;
  }
  router.navigate(['/login']);
  return false

  // const userService :UserService = inject(UserService);
  // const router :Router = inject(Router);
  //
  // const isAuth :boolean = userService.isAuthenticated();
  //
  // if (isAuth) {
  //   return true;
  // } else {
  //   router.navigate(['/login']);
  //   return false;
  // }
};
