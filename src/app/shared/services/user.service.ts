import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserDto } from "../Dtos/user.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersSubject = new BehaviorSubject<UserDto[]>([]); 
    users$ = this.usersSubject.asObservable();

    getUsers(): void {
        const users = this.usersSubject.getValue();
        console.log(users);
        this.usersSubject.next(users);
    }

    addUser(user: UserDto): void {
        const users = this.usersSubject.getValue();
        users.push(user);
        this.usersSubject.next(users);
    }
}   