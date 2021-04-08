import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../models/class';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    public urlEndPoint = environment.apiUrlComponents;

    constructor(
        private http: HttpClient
    ) {}

    getClasses(): Observable<Class[]> {
        return this.http.get(this.urlEndPoint + '/class/getAll').pipe(
            map(response => {
                return response as Class[];
            }
        ));
    }

}

