import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Library } from '../models/library';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {

    public urlEndPoint = environment.apiUrlComponents;

    constructor(
        private http: HttpClient
    ) {}

    getLibraries(): Observable<Library[]> {
        return this.http.get(this.urlEndPoint + '/library/getAll').pipe(
            map(response => {
                return response as Library[];
            }
        ));
    }

}

