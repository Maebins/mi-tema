import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        // Aquí iría tu AuthGuard más adelante
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('../app/modules/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent,
                    ),
            },
            // Agrega más rutas de features aquí...
        ],
    },
];
