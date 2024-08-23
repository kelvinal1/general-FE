import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = environment.apiUrl;
  private api = 'api/users';
  constructor(private router: Router,
    private http: HttpClient,
  ) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}`);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.api}`,user);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.api}/${id}`);
  }

}
