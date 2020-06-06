import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddCredentialsInterceptor } from './add-credentials.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AddCredentialsInterceptor, multi: true },
];
