import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: IUser | null = null;
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser') || '{}');

  }

  deleteUser(id: number | undefined) {
    if (!id) {
      console.log('No user id provided');
      return;
    }
    console.log('Deleting user with id: ' + id);
  }

  editUser(id: number) {
    console.log('Editing user with id: ' + id);
  }

  updateProfile() {
    console.log('Updating profile');
  }

  openPasswordDialog() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '400px',
    });
  }
}
