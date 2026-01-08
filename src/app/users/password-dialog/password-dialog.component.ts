//create password-dialog.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css'],
})
export class PasswordDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('currentPasswordInput') currentPasswordInput!: ElementRef;

  // Password visibility toggles
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  passwordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.passwordForm = this.fb.group({
      actualPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Form is already initialized in constructor
  }

  ngAfterViewInit(): void {
    // Auto-focus the first input field when dialog opens
    setTimeout(() => {
      this.currentPasswordInput?.nativeElement?.focus();
    }, 100);
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // Password strength calculation
  getPasswordStrength(): string {
    const password = this.passwordForm.get('password')?.value || '';
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  }

  getPasswordStrengthLabel(): string {
    const strength = this.getPasswordStrength();
    const labels: { [key: string]: string } = {
      weak: 'Débil',
      medium: 'Media',
      strong: 'Fuerte'
    };
    return labels[strength] || 'Débil';
  }

  getPasswordStrengthPercentage(): number {
    const strength = this.getPasswordStrength();
    const percentages: { [key: string]: number } = {
      weak: 33,
      medium: 66,
      strong: 100
    };
    return percentages[strength] || 0;
  }

  // Password requirement checks
  hasMinLength(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return password.length >= 8;
  }

  hasUpperCase(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return /[A-Z]/.test(password);
  }

  hasLowerCase(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.passwordForm.get('password')?.value || '';
    return /[0-9]/.test(password);
  }

  onSubmit(): void {
    if (!this.passwordForm.valid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.passwordForm.controls).forEach(key => {
        this.passwordForm.get(key)?.markAsTouched();
      });
      return;
    }

    let userId: number = 0;
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        userId = +user.id;
        this.userService.changePassword(
          this.passwordForm.value.actualPassword,
          this.passwordForm.value.password,
          userId
        );

        //   this.dialogRef.close(true);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
