import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HttpResponseInterface } from '../interfaces/http-response.interface';
import { User } from '../models/user.model';
import { getErrors } from '../utils/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  meUrl = `${environment.backend}/api/auth/me`;

  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private http: HttpClient,
  ) {
    this.loadCurrentUser();
  }

  public get user$(): Observable<User> {
    return this.currentUser.asObservable();
  }

  public updateUser(user: User) {
    this.currentUser.next(user);
    if (!user) {
      this.snackbar.open(
        `Вы не авторизованы. Войдите на сайт`,
        'ОК',
        {duration: environment.snackbarDuration}
      );
      this.router.navigate(['/login']);
    }
  }

  private loadCurrentUser() {
    this.http.get(this.meUrl).pipe(
      catchError(errData => getErrors(errData))
    ).subscribe((res: HttpResponseInterface) => {
      const currentUrl = this.activatedRoute.snapshot.url.join();
      if (!res.success && !currentUrl.includes('/login')) {
        this.updateUser(null);
      }
      this.updateUser(User.fromJson(res.result));
    });
  }
}
