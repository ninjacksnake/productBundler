import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
   user: IUser | null = null;
   ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
   }      
    
    deleteUser(id: number|undefined) {
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
}
