import { Observable, of } from 'rxjs';
import { HttpErrorData, HttpResponseInterface } from '../interfaces/http-response.interface';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

export function getErrors(errData: any): Observable<HttpResponseInterface> {
  const errors = Array.isArray(errData.error.error) ? errData.error.error : [{code: -1, message: 'Неизвестная ошибка'}];
  return of({ success: false, errors });
}

export function showError(response: HttpResponseInterface, snackbar: MatSnackBar): HttpErrorData {
  const errorData = response.errors[0];
  snackbar.open(
    `${errorData.code}: ${errorData.message}`,
    'ОК',
    {duration: environment.snackbarDuration}
  );
  return errorData;
}

export function showMessage(message: string, snackbar: MatSnackBar) {
  snackbar.open(
    message,
    'ОК',
    {duration: environment.snackbarDuration}
  );
}
