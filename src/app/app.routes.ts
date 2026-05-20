import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutEmptyComponent } from './layout/layout-empty/layout-empty.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },

    // Redirect signed-in user to the '/inicio'
 
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'inicio',
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutEmptyComponent,
        data: {
            layout: 'empty',
        },
        children: [
            /*
            {
                path: 'confirmacion-requerida',
                //canActivate: [registrationGuard],
                //loadChildren: () =>import(''),
            },
            {
                path: 'olvide-mi-contrasena',
                //loadChildren: () =>import(''),
            },
            {
                path: 'cambiar-contrasena',
                //loadChildren: () =>import(''),
            },
            {
                path: 'registrarse',
                //loadChildren: () =>import(''),
            },*/
            {
                path: 'iniciar-sesion',
                loadChildren: () =>
                    import('./modules/auth/sing-in/sign-in.routes'),
            },
        ],
    },

    {
        path: '',
        //canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('../app/modules/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent,
                    ),
            },
            {
                path: 'dashboard/ecommerce',
                loadComponent: () =>
                    import('../app/modules/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent,
                    ),
            }
        ],
    },
];
