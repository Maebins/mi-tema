import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';


import {
    catchError,
    finalize,
    map,
    Observable,
    of,
    switchMap,
    take,
    throwError,
} from 'rxjs';
import { API_BASE_URL } from '../../config/tokens';
import { AuthUtils } from './auth.utils';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _apiBaseUrl = inject(API_BASE_URL);
    private _userService = inject(UserService);
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        //this._token= token;
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
        //return this._token;
    }

    /**
     * Setter & getter for refresh token
     */

    set refreshToken(token: string) {
        localStorage.setItem('refreshToken', token) ?? '';
    }
    get refreshToken(): string {
        return localStorage.getItem('refreshToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resetear contraseña(Iniciar)
     *
     * @param email
     */
    forgotPassword(document: {
        documentType: string;
        documentNumber: string;
    }): Observable<any> {
        return this._httpClient
            .post(`${this._apiBaseUrl}/Auth/password-reset/start`, document)
            .pipe(
                map((response: any) => {
                    if (response.isSuccess) {
                        return response;
                    } else {
                        throw new Error(
                            response.errorMessage || 'Error en la verificación'
                        );
                    }
                })
            );
    }

    /**
     * Resetear contraseña(completar)
     *
     * @param password
     */
    resetPassword(newPassword: {
        userId: string;
        stageToken: string;
        newPassword: string;
        confirmPassword: string;
    }): Observable<any> {
        return this._httpClient
            .post(
                `${this._apiBaseUrl}/Auth/password-reset/complete`,
                newPassword
            )
            .pipe(
                map((response: any) => {
                    if (response.isSuccess) {
                        localStorage.removeItem('tempResetData');
                        return response;
                    } else {
                        throw new Error(
                            response.errorMessage || 'Error en la verificación'
                        );
                    }
                })
            );
    }

    /**
     * Iniciar Sesión
     *
     * @param credentials
     */
    public lastApiResponse: any = null;

    signIn(credentials: {
        user: string;
        password: string;
    }): Observable<any> {
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post(`${this._apiBaseUrl}/Auth/login-document`, credentials)
            .pipe(
                switchMap((response: any) => {
                    this.accessToken = response.data.accessToken;

                    this.refreshToken = response.data.refreshToken;

                    this._authenticated = true;

                    return of(response);
                })
            );
    }

     /**
     * Modulo para mantener la sesion, recuperando datos del usuario actual
     */
    signInUsingToken(): Observable<any> {
        return this._userService.get().pipe(
            switchMap((user) => {
                if (user) {
                    this._authenticated = true;
                    return of(true);
                }
                this.signOut();
                return of(false);
            }),
            catchError((error) => {
                this.signOut();
                return of(false);
            })
        );
    }


    /**
     * Cerrar Sesión
     */

    signOut(): Observable<any> {
        const payload = this.accessToken
            ? AuthUtils._decodeToken(this.accessToken)
            : null;
        const body = {
            jwtId: payload ? payload.jti : null,
        };
        return this._httpClient
            .post(`${this._apiBaseUrl}/Auth/logout`, body)
            .pipe(
                map(() => true),
                catchError(() => of(true)),
                finalize(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    this._authenticated = false;
                })
            );
    }

    /**
     * Unlock session(Aun no se usa)
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Verifica el estado de Sesion del usuario
     */
    check(): Observable<boolean> {
        // Verificar que este logueado
        if (this._authenticated) {
            return of(true);
        }

        // Verificar que el accesstoken sea valido
        if (!this.accessToken) {
            return of(false);
        }


        //  Si el token es  válido y no ha expirado
        return this.signInUsingToken();
    }

}
