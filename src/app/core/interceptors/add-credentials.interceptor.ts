import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable()
export class AddCredentialsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.startsWith(environment.backend)) {
        req = req.clone({withCredentials: true});
      }
      return next.handle(req);
    }
}
