import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpResponseInterface } from '../interfaces/http-response.interface';
import { getErrors } from '../utils/http';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksUrl = `${environment.backend}/api/task`;

  constructor(private http: HttpClient) { }

  sendEmail(email: string, message: string): Observable<HttpResponseInterface> {
    const url = `${this.tasksUrl}/send_mail`;
    const body = {email, message};

    return this.http.post(url, body).pipe(
      map((response: HttpResponseInterface) => response),
      catchError(errData => getErrors(errData))
    );
  }
}
