import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';
import { TasksService } from '../../shared/services/tasks.service';
import { UserService } from '../../shared/services/user.service';
import { showMessage } from '../../shared/utils/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private tasksService: TasksService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    });
  }

  logout() {
    this.authService.logout().subscribe( res => {
      showMessage('Вы вышли с сайта', this.snackbar);
      this.userService.updateUser(null);
    });
  }

  sendEmail() {
    this.tasksService.sendEmail(
      this.form.controls.email.value,
      this.form.controls.message.value
    ).subscribe(res => {
      showMessage('email отправлен', this.snackbar);
    });
  }
}
