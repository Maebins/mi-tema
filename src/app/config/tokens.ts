import { InjectionToken } from '@angular/core';

/**
 * Define un InjectionToken para proveer la URL base de la API.
 *
 */

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
