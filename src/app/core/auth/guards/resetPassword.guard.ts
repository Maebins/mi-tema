import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const tempResetData = localStorage.getItem('tempResetData');

    if (!tempResetData) {
        router.navigate(['/olvide-mi-contrasena']);
        return false;
    }
    return true;
};
