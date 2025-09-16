import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { HttpService } from "../http.service";




@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private snackBar: MatSnackBar, private http: HttpService) { }

    find(): Observable<IUser[]> {
        return  this.http.get('/users');
    }
    findById(id: number): Observable<IUser> {
        return this.http.get('/users/' + id);
    }
  findByEmail(email: string): Observable<IUser> {
        const body = {
            email: email,
            
        }
        return this.http.post('/users', body);
    }

    create(user: IUser): void {
        this.http.post('http://localhost:3000/users', user).subscribe(() => {
        this.snackBar.open('User added successfully', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['mat-snackbar-success']
        });
    });
    }   

    delete(id: number): void {
        this.http.delete('http://localhost:3000/users/' + id).subscribe(() => {
            this.snackBar.open('User deleted successfully', 'Close', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['mat-snackbar-success']
            });
        });
    }

    update(user: IUser, id: number): boolean {
        try {
            this.http.put('/users/' + id, user).subscribe(() => {
                this.snackBar.open('User updated successfully', 'Close', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: ['mat-snackbar-success']
                });
            });
            return true;
        } catch (error) {
            this.snackBar.open('User was not updated', 'Close', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['mat-snackbar-error']
            });
            return false;
        }
       
    }       
}       