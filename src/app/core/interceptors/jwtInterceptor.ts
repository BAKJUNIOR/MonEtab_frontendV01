import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import {inject} from '@angular/core';
import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';

// Définir l'intercepteur en tant que fonction
export const jwtInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const localService :LocalStorageService = inject(LocalStorageService);
  const router :Router = inject(Router);

  const token: string | null = localService.getToken();

  // Si un token est présent, cloner la requête avec le token dans les headers
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => handleError(error, localService, router))
    );
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => handleError(error, localService, router))
  );
};

function handleError(error: HttpErrorResponse, localService: LocalStorageService, router: Router): Observable<never> {
  if (error.status === 401) {
    localService.destroyToken();
    router.navigate(['/login']);
  } else if (error.status === 403) {
    console.error('Accès interdit: Vous n’avez pas les permissions nécessaires.');
  } else if (error.status === 500) {
    console.error('Erreur serveur: Veuillez réessayer plus tard.');
  } else {
    console.error(`Erreur HTTP: ${error.message}`);
  }
  return throwError(() => new Error(error.message));
}
