import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserResponse } from '../shared/models/UserResponse';
import { IUserRequest } from '../shared/models/UserRequest';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUserResponse>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(sessionId:string) {
    if (sessionId === null) {
      this.currentUserSource.next(null!);
      return of(null);
    }

    return this.http.get(`${this.baseUrl}Authentication/details?sessionId=${sessionId}`).pipe(
      map((user: IUserResponse) => {
        if (user) {
          user.sessionId = sessionId;
          this.currentUserSource.next(user);
          return user;
        }
      })
    );
  }

  login(values: IUserRequest) {
    return this.http.post(`${this.baseUrl}Authentication/login`, values).pipe(
      map((user: IUserResponse) => {
        if (user) {
          localStorage.setItem('sessionId', user.sessionId);
          this.currentUserSource.next(user);
          return user;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('sessionId');
    this.currentUserSource.next(null!);
    this.router.navigateByUrl('/movies');
  }

  UrlToRedirect(returnUrl: string) {
    this.router.navigateByUrl(returnUrl);
  }
}
