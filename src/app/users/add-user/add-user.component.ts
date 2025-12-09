import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../../shared/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    // private http: HttpClient, 
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpService
  ) { }

  access_token = localStorage.getItem('access_token');
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.access_token
  });

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        AddUserComponent.passwordPatternValidator
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: AddUserComponent.passwordMatchValidator
    });

    // Initialize form values
    this.userForm.patchValue({
      role: 'USER' // Default role
    });

    // Subscribe to form value changes for debugging
    this.userForm.valueChanges.subscribe(value => {
      //   console.log('Form values changed:', value);
    });
  }

  static passwordPatternValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (!hasUpperCase) {
      return { 'missingUpperCase': true };
    }
    if (!hasLowerCase) {
      return { 'missingLowerCase': true };
    }
    if (!hasNumber) {
      return { 'missingNumber': true };
    }
    return null;
  }

  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { match: true };
    }
    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {

      const formData = this.userForm.value;
      formData.confirmPassword = undefined;

      this.http.post('/users', formData).subscribe(() => {
        this.snackBar.open('User added successfully', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['mat-snackbar-success']
        });
        this.router.navigate(['/bundler/login']);

      });

    } else {

      // Mark all controls as touched to show validation errors
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  // Password validation helper methods for real-time feedback
  hasMinLength(): boolean {
    const password = this.userForm.get('password')?.value || '';
    return password.length >= 8;
  }

  hasUpperCase(): boolean {
    const password = this.userForm.get('password')?.value || '';
    return /[A-Z]/.test(password);
  }

  hasLowerCase(): boolean {
    const password = this.userForm.get('password')?.value || '';
    return /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.userForm.get('password')?.value || '';
    return /\d/.test(password);
  }

  onCancel() {
    this.router.navigate(['/bundler/users']);
  }
}
