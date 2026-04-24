import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly tokenKey = 'auth_token';

    isAuthenticated = signal<boolean>(this.hasToken());

    constructor() {}

    login(token: string): void {
        localStorage.setItem(this.tokenKey, token);
        this.isAuthenticated.set(true);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.isAuthenticated.set(false);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private hasToken(): boolean {
        return !!this.getToken();
    }
}
