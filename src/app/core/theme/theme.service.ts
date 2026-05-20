import { Injectable, signal } from '@angular/core';
import { ThemeMode } from './theme.type';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    
    themeMode = signal<ThemeMode>(this.getStoredTheme());

    isDarkMode = signal<boolean>(false);

    constructor() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.themeMode() === 'system') {
                this.applyTheme('system');
            }
        });

        this.applyTheme(this.themeMode());
    }

    setTheme(mode: ThemeMode) {
        this.themeMode.set(mode);
        localStorage.setItem('app-theme', mode);
        this.applyTheme(mode);
    }

    toggleTheme() {
        const current = this.isDarkMode() ? 'light' : 'dark';
        this.setTheme(current);
    }

    private applyTheme(mode: ThemeMode) {
        const htmlElement = document.documentElement;
        let isDark = false;

        if (mode === 'system') {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            isDark = mode === 'dark';
        }

        this.isDarkMode.set(isDark);

        if (isDark) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }

    private getStoredTheme(): ThemeMode {
        const stored = localStorage.getItem('app-theme') as ThemeMode;
        return stored ? stored : 'system'; 
    }
}
