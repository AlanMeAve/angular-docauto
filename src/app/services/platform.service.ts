import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Platform } from '../models/platform';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    public urlEndPoint = environment.apiUrlComponents;

    constructor(
        private http: HttpClient
    ) {}

    getPlatfroms(): Observable<Platform[]> {
        return this.http.get(this.urlEndPoint + '/platform/getAll').pipe(
            map(response => {
                return response as Platform[];
            }
        ));
    }

}

