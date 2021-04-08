import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { System } from '../models/system';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SystemService {

    public urlEndPoint = environment.apiUrlComponents;

    constructor(
        private http: HttpClient
    ) {}

    getSystems(): Observable<System[]> {
        return this.http.get(this.urlEndPoint + '/system/getAll').pipe(
            map(response => {
                return response as System[];
            }
        ));
    }

}

