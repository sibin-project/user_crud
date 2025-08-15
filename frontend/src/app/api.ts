import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'https://user-crud-backend-5v09.onrender.com';

  constructor(private http: HttpClient) {}


}
