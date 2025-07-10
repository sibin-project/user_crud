import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-curd',
  imports: [ReactiveFormsModule],
  templateUrl: './curd.html',
  styleUrls: ['./curd.css'],
})
export class Curd implements OnInit {
  usersbd: any[] = [];
  usersonsave: any[] = [];
  editMode = false;
editUserId: number | null = null;

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor(private apiService: HttpClient) {}

  getusers() {
    this.apiService
      .get('http://localhost:3000/api/users')
      .subscribe((res: any) => {
        this.usersbd = res;
      });
  }
  ngOnInit(): void {
    this.getusers();
  }
 onsave() {
  const formData = this.userForm.value;

  if (this.editMode && this.editUserId !== null) {
    // Edit
    this.apiService
      .put(`http://localhost:3000/api/users/${this.editUserId}`, formData)
      .subscribe(() => {
        this.getusers();
        this.userForm.reset();
        this.editMode = false;
        this.editUserId = null;
      });
  } else {
    // Add
    this.apiService.post('http://localhost:3000/postusers', formData).subscribe(() => {
      this.getusers();
      this.userForm.reset();
    });
  }
}
onEdit(user: any) {
  this.userForm.setValue({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  this.editMode = true;
  this.editUserId = user.id;
}

onDelete(id: number) {
  if (confirm('Are you sure to delete this user?')) {
    this.apiService.delete(`http://localhost:3000/api/users/${id}`).subscribe(() => {
      this.getusers();
    });
  }
}


}
