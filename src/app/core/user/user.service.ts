import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserPagination} from '../user/user.types';
import { Observable, of, ReplaySubject, switchMap, tap } from 'rxjs';
import { API_BASE_URL } from '../../config/tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _apiBaseUrl = inject(API_BASE_URL);
    private _currentUserId: string = '';
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods Gestion de usuarios
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<any>(`${this._apiBaseUrl}/Auth/me`).pipe(
            tap((user) => {
                this._currentUserId = user.userId;
                this._user.next(user);
            })
        );
    }
    /**
     * Registrar nuevos usuarios (SOLO ADMINISTRADORES)
     * @param userData
     * @returns
     */
    createUser(userData: User): Observable<any> {
        return this._httpClient
            .post<User>(`${this._apiBaseUrl}/User/register`, userData)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
    /**
     * Actualizar usuario por ID (SOLO ADMINISTRADORES)
     * @param id
     * @param userData
     */
    updateUserById(id: string, userData: Partial<User>): Observable<User> {
        return this._httpClient
            .put<User>(`${this._apiBaseUrl}/User/${id}`, userData)
            .pipe(
                tap(() => {
                    if (this._currentUserId && this._currentUserId === id) {
                        this.get().subscribe();
                    }
                })
            );
    }

    /**
     * Eliminar Usuario (SOLO ADMINISTRADORES)
     */
    removeUser(id: string): Observable<User> {
        return this._httpClient.delete<User>(`${this._apiBaseUrl}/User/${id}`);
    }

    /**
     * Desactivar Usuario (SOLO ADMINISTRADORES)
     */

    disableUser(userData: Partial<User>): Observable<User> {
        return this._httpClient
            .patch<User>(
                `${this._apiBaseUrl}/User/${userData.id}/disable`,
                userData
            )
            .pipe(
                tap((response) => {
                    console.log('Usuario desactivado');
                })
            );
    }

    /**
     * Activar Usuario (SOLO ADMINISTRADORES)
     */

    enableUser(userData: Partial<User>): Observable<User> {
        return this._httpClient
            .patch<User>(
                `${this._apiBaseUrl}/User/${userData.id}/enable`,
                userData
            )
            .pipe(tap((response) => {}));
    }

    /**
     * List Users
     *
     * @param user
     */
    listUsers(
        page: number = 1,
        size: number = 10,
        search: string = ''
    ): Observable<UserPagination> {
        let params = new HttpParams()
            .set('pageNumber', page.toString())
            .set('pageSize', size.toString());

        if (search) {
            params = params.set('search', search);
        }

        return this._httpClient.get<UserPagination>(
            `${this._apiBaseUrl}/User`,
            { params }
        );
    }

    /**
     * Obtener Usuario Por ID
     * * @param id
     */
    getUserById(id: string): Observable<User> {
        return this._httpClient.get<User>(`${this._apiBaseUrl}/User/${id}`);
    }
}
