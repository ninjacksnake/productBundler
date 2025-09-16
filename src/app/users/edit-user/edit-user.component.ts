import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  userId: number = 0;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    // photo: new FormControl('', Validators.required),
    // password: new FormControl('', Validators.minLength(8)),
    // confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

ngOnInit(): void {
  this.userId = this.activatedRoute.snapshot.params['id'];
  this.userService.findById(this.userId).subscribe((user: IUser) => {
   this.userForm.patchValue(user);
  });
  
 }
  

  ngAfterViewInit(): void {
  }

 

  onSubmit = () => {
    console.log(this.userId);
    const result = this.userService.update(this.userForm.value as IUser,+this.userId);
   if(result){
         this.router.navigate(['/users']);
   }
  };
}
