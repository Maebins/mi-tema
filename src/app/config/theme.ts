import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MySystemPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f5e7e9',
            100: '#f0dbde',
            200: '#e1b4bc',
            300: '#c5808e', 
            400: '#b2465b', 
            500: '#9e0c26', 
            600: '#8e0b22',
            700: '#77091d',
            800: '#570717',
            900: '#470511',
            950: '#37040d',
        },
        secondary: {
            50: '#fbf7eb',
            100: '#f9f3e1',
            200: '#f2e6c1',
            300: '#e7d096',
            400: '#dec16c', 
            500: '#d4af37', 
            600: '#bf9e32',
            700: '#9f8329',
            800: '#776921',
            900: '#5f4f19',
            950: '#4a3d13'
        },
        // Colores de apoyo (sobrescribir aquí)
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{secondary.50}',
                    100: '{secondary.100}',
                },
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{secondary.950}',
                    100: '{secondary.900}',
                },
            },
        },
    } as any,
});
