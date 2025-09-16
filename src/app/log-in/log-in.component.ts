import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html', 
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent {
  logInForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  } 
}
