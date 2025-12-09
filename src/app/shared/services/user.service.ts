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
        return this.http.get('/users');
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
        this.http.post('/users/', user).subscribe(() => {
            this.snackBar.open('Usuario agregado exitosamente', 'Cerrar', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['mat-snackbar-success']
            });
        });
    }

    delete(id: number): void {
        this.http.delete('/users/' + id).subscribe((response) => {
            console.log(response)
            this.snackBar.open('Usuario eliminado exitosamente', 'Cerrar', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['mat-snackbar-success']
            });
        });
    }

    update(user: IUser, id: number): boolean {
        try {
            this.http.patch('/users/' + id, user).subscribe(() => {
                this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: ['mat-snackbar-success']
                });
            });
            return true;
        } catch (error) {
            this.snackBar.open('Usuario no actualizado ', 'Cerrar', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['mat-snackbar-error']
            });
            return false;
        }

    }

    restore(id: number): void {
        this.http.patch('/users/restore/', { id }).subscribe((response) => {
            console.log(response)
            this.snackBar.open('Usuario restaurado exitosamente', 'Cerrar', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['mat-snackbar-success']
            });
        });
    }

    resetPassword(id: number): void {
        this.http.patch('/users/reset-password/', { id }).subscribe((response) => {
            console.log(response)
            this.snackBar.open('Contraseña restablecida exitosamente', 'Cerrar', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['mat-snackbar-success']
            });
        });
    }

    changePassword(actualPassword: string, newPassword: string, id: number): void {
        this.http.patch('/users/update-password', {
            id,
            currentPassword: actualPassword,
            newPassword: newPassword
        }).subscribe({
            next: () => {
                this.snackBar.open('Contraseña actualizada exitosamente', 'Cerrar', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: ['mat-snackbar-success']
                });
            },
            error: (error) => {
                // Handle different error scenarios
                let errorMessage = error.error.message;

                if (errorMessage === "Current password is incorrect") {
                    this.snackBar.open('Contraseña incorrecta', 'Cerrar', {
                        duration: 2000,
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                        panelClass: ['mat-snackbar-error']
                    });
                }
            }
        });
    }
}       