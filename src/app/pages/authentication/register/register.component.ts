import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showError, showMessage } from '../../../shared/utils/http';
import * as HttpStatus from 'http-status-codes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  minPasswordLength = 4;
  minNameLength = 5;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private auth: AuthService,
              private userService: UserService,
  ) { }

  ngOnInit() {
    this.subscribeUser();

    this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(this.minNameLength)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]],
        passwordConfirm: ['', [Validators.required]],
        agree: [false, [Validators.requiredTrue]]
      },
      {validator: (form: FormGroup) => {
          const password = form.get('password');
          const confirmPassword = form.get('passwordConfirm');
          if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({match: true});
          }
        }}
    );
  }

  send() {
    this.auth.register(
      this.form.controls.name.value,
      this.form.controls.email.value,
      this.form.controls.password.value,
    ).subscribe(
      (res) => {
        if (res instanceof User) {
          this.router.navigate(['/']);

          this.userService.updateUser(res);
          showMessage(`Вы зарегистрировались, как ${res.email}`, this.snackbar);
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
