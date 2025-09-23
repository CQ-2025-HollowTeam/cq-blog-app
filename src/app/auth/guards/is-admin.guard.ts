import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { firstValueFrom } from 'rxjs';

export enum Role {
    USER = 0,
    EDITOR = 1,
    ADMIN = 2
}

export const isAdminGuard: CanMatchFn = async (route, segments) => {

  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  await firstValueFrom(authService.checkAuthStatus());

  // Get the user and check the role
  const user = await firstValueFrom(userService.getUser());
  if (user?.role !== Role.ADMIN) {
    return router.parseUrl('/');
  }
  return true;
};