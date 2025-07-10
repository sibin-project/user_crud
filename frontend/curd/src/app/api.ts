import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.baseUrl);
  }

  addUser(user: any) {
    return this.http.post(this.baseUrl, user);
  }

  // deleteUser(id: number) {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }

  // updateUser(id: number, user: any) {
  //   return this.http.put(`${this.baseUrl}/${id}`, user);
  // }
}
