import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  public loggedUser: IUser | null = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  public dataSource = new MatTableDataSource<IUser>();
  searchTerm: string = '';
  filtredUsers: IUser[] = [];

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'role', 'options'];

  ngOnInit(): void {
    this.userService.find().subscribe((users: IUser[]) => {
      this.dataSource.data = users;
      this.filtredUsers = users;
    });
  }

  makeAdmin(id: number) {
    this.userService.makeAdmin(id);
    this.userService.find().subscribe((users: IUser[]) => {
      this.dataSource.data = users;
      this.filtredUsers = users;
    });
    this.reloadComponent();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  reloadComponent() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/bundler/users/list']);
    });
  }

  delete(id: number) {
    this.userService.delete(id);
    this.userService.find().subscribe((users: IUser[]) => {
      this.dataSource.data = users;
      this.filtredUsers = users;
    });
    this.reloadComponent();
  }

  filterUsers(): void {
    this.dataSource.data = this.filtredUsers.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetPassword(id: number) {
    this.userService.resetPassword(id);
    this.userService.find().subscribe((users: IUser[]) => {
      this.dataSource.data = users;
      this.filtredUsers = users;
    });
    this.reloadComponent();
  }

  restore(id: number) {
    this.userService.restore(id);
    this.userService.find().subscribe((users: IUser[]) => {
      this.dataSource.data = users;
      this.filtredUsers = users;
    });
    this.reloadComponent();

  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterUsers();
  }
}
