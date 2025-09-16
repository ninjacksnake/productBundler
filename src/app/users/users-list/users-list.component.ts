import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  public dataSource = new MatTableDataSource<IUser>();
  searchTerm: string = '';
  filtredUsers: IUser[] = [];

  constructor(private userService: UserService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'role', 'options'];

  ngOnInit(): void {
    this.userService.find().subscribe((users: IUser[]) => {
      this.dataSource.data = users;
      this.filtredUsers = users;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number) {
    this.userService.delete(id);
    this.userService.find().subscribe((users: IUser[]) => {
      this.dataSource.data = users;
      this.filtredUsers = users;
    });
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
}
