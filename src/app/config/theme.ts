import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MySystemPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
        },
        secondary: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
        },
        // Colores de apoyo (sobrescribir aquí)
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{secondary.50}',
                    100: '{secondary.100}',
                    // ... esto mapea los colores de fondo al modo claro
                },
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{secondary.950}',
                    100: '{secondary.900}',
                    // ... esto mapea los colores de fondo al modo oscuro
                },
            },
        },
    } as any,
});
