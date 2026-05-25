import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MySystemPreset = definePreset(Aura, {
    semantic: {
        // AMARILLO CASCO (Primario)
        primary: {
            50: '#fffdf0',
            100: '#fff9d6',
            200: '#fff1a8',
            300: '#ffe570',
            400: '#ffd63d',
            500: '#ffc107',
            600: '#f5a800', 
            700: '#cc8400',
            800: '#a36500', 
            900: '#854f05',
            950: '#4d2a00',
            DEFAULT: '#ffc107',
        },
        // NARANJA BANDA (Secundario / Acento)
        secondary: {
            50: '#fff8f0',
            100: '#ffeed6',
            200: '#ffd7a8',
            300: '#ffbb70',
            400: '#fa9e3d',
            500: '#f7931e',
            600: '#e07b0e', 
            700: '#bb5c08',
            800: '#94460d',
            900: '#783a0f',
            950: '#401b05',
            DEFAULT: '#f7931e',
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
