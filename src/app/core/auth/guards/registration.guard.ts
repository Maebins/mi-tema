import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const registrationGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const tempRegisterData = localStorage.getItem('tempRegisterData');

    if (!tempRegisterData) {
        router.navigate(['/registrarse']);
        return false;
    }
    return true;
};
