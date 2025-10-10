import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, map, catchError } from "rxjs";
import { IUser } from "../interfaces/user.interface";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";


interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: IUser;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private currentUserSubject = new BehaviorSubject<IUser | null>(null);
    public currentUser = this.currentUserSubject.asObservable();
    private access_token: string | null = null;
    private refresh_token: string | null = null; 

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // Try to load token from localStorage on startup
        const savedToken = localStorage.getItem('access_token');
        const savedRefreshToken = localStorage.getItem('refresh_token');
        const loggedUser = localStorage.getItem('loggedUser');
     

        if (savedToken) {
            this.access_token = savedToken;
            this.refresh_token = savedRefreshToken;
            this.currentUserSubject.next(JSON.parse(loggedUser || '{}'));
        }
    }

    public logIn(credentials: { email: string; password: string }): Observable<boolean> {
        return this.http.post<AuthResponse>('http://localhost/api/v1/auth/login', credentials).pipe(
            map((response) => {
                this.access_token = response.access_token;
                this.refresh_token = response.refresh_token;
                localStorage.setItem('access_token', this.access_token);
                localStorage.setItem('refresh_token', this.refresh_token);
                localStorage.setItem('loggedUser', JSON.stringify(response.user));
               
                this.currentUserSubject.next(response.user); 
                return true;
            }),
            catchError((error) => {
                console.error('Login error:', error);
                return of(false);
            })
        );
    }

    // Get current user
    public getCurrentUser(): Observable<IUser | null> {
        if (this.currentUserSubject.value) {
          //  console.log("user is",this.currentUserSubject.value)
            return of(this.currentUserSubject.value);
        }
        
        if (!this.access_token) {
            
            return of(null);
        }

        let user: IUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
        console.log("user is",user)
        this.currentUserSubject.next(user);
        return of(user);
    }

    // Check if user is logged in
    public isLoggedIn(): boolean {
        return !!this.access_token && this.currentUserSubject.value !== null;
    }

    // Logout       
    public logout(): void {
        this.access_token = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    // Get auth token
    public getToken(): string | null {
        return this.access_token;
    }
}