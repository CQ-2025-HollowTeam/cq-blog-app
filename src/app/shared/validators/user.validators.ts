import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of, timer } from 'rxjs';
import { map, catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@auth/services/auth.service';

export function usernameValidator(): AsyncValidatorFn {
    const authService = inject(AuthService);
    return (control: AbstractControl) => {
        return timer(500).pipe(
            switchMap(() =>
                authService.checkUsername(control.value).pipe(
                    map((isTaken) =>
                        isTaken ? { usernameTaken: true } : null
                    ),
                    catchError(() => of(null))
                )
            )
        );
    };
}

export function emailValidator(): AsyncValidatorFn {
    const authService = inject(AuthService);
    return (control: AbstractControl) => {
        return timer(500).pipe(
            switchMap(() =>
                authService.checkEmail(control.value).pipe(
                    map((isTaken) => (isTaken ? { emailTaken: true } : null)),
                    catchError(() => of(null))
                )
            )
        );
    };
}
