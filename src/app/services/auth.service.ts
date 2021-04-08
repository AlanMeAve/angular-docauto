import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user?: User;
  private _token?: string;

  constructor(
    private http: HttpClient
  ) {}

  public get user(): User {
    if(this._user != null){
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')|| '') as User;
      return this._user;
    } else {
      return new User();
    }
  }
  public get token(): string {
    if(this._token != null){
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      return sessionStorage.getItem('token') || '';
    } else {
      return '';
    }
  }

  login(user: User): Observable<any> {
    const urlEndPoint = environment.apiUrlSecurity + '/oauth/token';
    const credentials = btoa(environment.appName + ':' + environment.appPassword);
    const httpHeaders = new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic ' + credentials});
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.userName || '');
    params.set('password', user.password || '');
    console.log('params: ', params.toString());
    return this.http.post(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  saveUser(accessToken: string): void {
    let payload = this.getDataToken(accessToken);

    this._user = new User();
    this._user.name = payload.name;
    this._user.firstSurname = payload.firstSurname;
    this._user.secondSurname = payload.secondSurname;
    this._user.userName = payload.userName;
    this._user.role = payload.authorities[0];

    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken: string): void {
    sessionStorage.setItem('token', accessToken);
  }

  getDataToken(accessToken: string): any {
    if(accessToken != null && accessToken.length > 0){
      return JSON.parse(atob(accessToken.split('.')[1]));
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    let payload = this.getDataToken(this.token);
    return payload != null && payload.userName && payload.userName.length > 0;
  }

  logout(): void {
    this._user = null as any;
    this._token = null as any;
    sessionStorage.clear();
  }

  hasRole(roles: string[]){

    if(this.user == null || this.user.role == null || this.user.role.length == 0){
      return false;
    }

    return roles.includes(this.user.role);
  }

}
