import { Component } from '@angular/core';

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  password: string;
  createdDate: Date;
  updatedDate: Date;
}

const users: User[] = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@gmail.com',
    role: 'Admin',
    password: '123456',
    createdDate: new Date(),
    updatedDate: new Date(),
  },

  {
    id: 2,
    name: 'User 2',
    email: 'user2@gmail.com',
    role: 'User',
    password: '12345678',
    createdDate: new Date(),
    updatedDate: new Date(),
  },

  {
    id: 3,
    name: 'User 3',
    email: 'user3@gmail.com',
    role: 'User',
    password: '123456789',
    createdDate: new Date(),
    updatedDate: new Date(),
  },
]

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = users;    
  displayedColumns: string[] = [ 'name', 'email', 'role', 'options' ];

  constructor() { 
  
   } 
}
