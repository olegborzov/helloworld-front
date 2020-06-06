import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as HttpStatus from 'http-status-codes';

import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { showError, showMessage } from '../../../shared/utils/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  rememberMe = false;
  minPasswordLength = 4;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.subscribeUser();

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]],
      rememberMe: [false, [Validators.required]],
    });
  }

  send() {
    this.auth.login(
      this.form.controls.email.value,
      this.form.controls.password.value,
      this.rememberMe
    ).subscribe(
      (res) => {
        if (res.result instanceof User) {
          const user = res.result;
          this.userService.updateUser(user);
          this.router.navigate(['/']);
          showMessage(`Вы вошли, как ${user.email}`, this.snackbar);
        } else {
          const errorData = showError(res, this.snackbar);
          if (errorData.code === HttpStatus.FORBIDDEN) {
            this.router.navigate(['/']);
          }
          return;
        }
      }
    );
  }

  private subscribeUser() {
    this.userService.user$.subscribe(user => {
      if (user) {
        showMessage(`Вы уже авторизованы, как ${user.email}`, this.snackbar);
        this.router.navigate(['/']);
      }
    });
  }
}
