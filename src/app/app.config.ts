import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { MySystemPreset } from './config/theme';
import { authInterceptor } from './core/auth/auth.interceptor';
import { environment } from '../environments/environment';
import {
    API_BASE_URL,
} from './config/tokens';


export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        provideRouter(
            appRoutes,
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
        ),
         provideHttpClient(withInterceptors([authInterceptor])),
         
        //API PRINCIPAL AUTENTICACION
        { provide: API_BASE_URL, useValue: environment.apiUrl },

        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        providePrimeNG({
            theme: {
                preset: MySystemPreset,
                options: {
                    darkModeSelector: '.dark',
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities',
                    },
                },
            },
        }),

    ],
};
