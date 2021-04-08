import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public urlEndPoint = environment.apiUrlUsers;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get(this.urlEndPoint + '/getAll').pipe(
      map(response => {
        return response as User[];
      }
    ));
  }

  getUserByUserName(userName: string): Observable<User> {
    return this.http.get(this.urlEndPoint + '/findByUsername/' + userName).pipe(
      map(response => {
        return response as User;
      }
    ));
  }

  save(user: User): Observable<User> {
    return this.http.put(this.urlEndPoint + '/save', user).pipe(
      map(response => {
        return response as User;
      },
      catchError(e => {
        console.error('e: ', e);
        return throwError(e);
      })
    ));
  }

  update(userName: string, user: User): Observable<User> {
    return this.http.post(this.urlEndPoint + '/update/' + userName, user).pipe(
      map(response => {
        return response as User;
      },
      catchError(e => {
        console.error('e: ', e);
        return throwError(e);
      })
    ));
  }

  delete(userName: string): Observable<number> {
    return this.http.delete(this.urlEndPoint + '/delete/' + userName).pipe(
      map(response => {
        return response as number;
      },
      catchError(e => {
        console.error('e: ', e);
        return throwError(e);
      })
    ));
  }

}
