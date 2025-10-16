import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html', 
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent {
  logInForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private matSnack: MatSnackBar) {
    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  } 

  onSubmit() {
      this.authService.logIn(this.logInForm.value).subscribe({
      next: (success) => {
        if(success){
          this.router.navigate(['/bundler/bundles']);
        } else {
          this.matSnack.open('Invalid credentials', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['mat-snackbar-error'],
          });
         // this.router.navigate(['/login']);
        }
      },
      error: (error) => {
          this.matSnack.open('Invalid credentials', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['mat-snackbar-error'],
        });
      }
    });
  } 
}
