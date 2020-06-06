import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  HttpResponseInterface,
  ResponseInterface,
} from '../interfaces/http-response.interface';
import { User } from '../models/user.model';
import { getErrors } from '../utils/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = `${environment.backend}/api/auth`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string, rememberMe: boolean = true): Observable<ResponseInterface<User>> {
    const url = `${this.authUrl}/login`;
    const body = {email, password, remember_me: rememberMe};

    return this.http.post(url, body).pipe(
      map((response: HttpResponseInterface) => {
        response.result = User.fromJson(response.result);
        return response;
      }),
      catchError(errData => getErrors(errData))
    );
  }

  register(name: string, email: string, password: string): Observable<ResponseInterface<User>> {
    const url = `${this.authUrl}/register`;
    const body = {name, email, password};

    return this.http.post(url, body).pipe(
      map((response: HttpResponseInterface) => User.fromJson(response.result)),
      catchError(errData => getErrors(errData))
    );
  }

  logout(): Observable<HttpResponseInterface> {
    const url = `${this.authUrl}/logout`;

    return this.http.post(url, null).pipe(
      map((response: HttpResponseInterface) => response),
      catchError(errData => getErrors(errData))
    );
  }
}
