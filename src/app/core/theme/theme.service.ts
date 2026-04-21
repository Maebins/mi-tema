import { Injectable, signal } from '@angular/core';
import { ThemeMode } from './theme.type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Signal que guarda el estado actual. Por defecto busca en localStorage o usa 'system'
  themeMode = signal<ThemeMode>(this.getStoredTheme());

  // Signal computada que nos dice si actualmente está activo el modo oscuro visualmente
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Escuchar cambios en la preferencia del sistema operativo del usuario
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.themeMode() === 'system') {
        this.applyTheme('system');
      }
    });

    // Inicializar el tema actual
    this.applyTheme(this.themeMode());
  }

  // Método para cambiar el tema
  setTheme(mode: ThemeMode) {
    this.themeMode.set(mode);
    localStorage.setItem('app-theme', mode);
    this.applyTheme(mode);
  }

  // Método rápido para el botón del Header (Alterna entre Dark y Light)
  toggleTheme() {
    const current = this.isDarkMode() ? 'light' : 'dark';
    this.setTheme(current);
  }

  // Lógica interna para aplicar las clases al HTML
  private applyTheme(mode: ThemeMode) {
    const htmlElement = document.documentElement;
    let isDark = false;

    if (mode === 'system') {
      // Verifica si el Windows/Mac del usuario está en modo oscuro
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDark = mode === 'dark';
    }

    this.isDarkMode.set(isDark);

    // Agrega o quita la clase '.dark' que usan Tailwind y PrimeNG
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  private getStoredTheme(): ThemeMode {
    const stored = localStorage.getItem('app-theme') as ThemeMode;
    return stored ? stored : 'system'; // 'system' por defecto si es la primera vez
  }
}
