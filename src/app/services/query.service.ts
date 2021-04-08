import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { System } from '../models/system';
import { Class } from '../models/class';
import { Library } from '../models/library';
import { Query } from '../models/query';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QueryService {

    public urlEndPoint = environment.apiUrlComponents;

    constructor(
        private http: HttpClient
    ) {}

    getSystemsByPlatformId(id: string): Observable<System[]> {
        return this.http.get(this.urlEndPoint + '/query/getSystemsByPlatform/' + id).pipe(
            map(response => {
                return response as System[];
            }
        ));
    }

    getClasessBySystemId(id: string): Observable<Class[]> {
        return this.http.get(this.urlEndPoint + '/query/getClasessBySystem/' + id).pipe(
            map(response => {
                return response as Class[];
            }
        ));
    }

    getLibrariesByClassId(id: string): Observable<Library[]> {
        return this.http.get(this.urlEndPoint + '/query/getLibrariesByClass/' + id).pipe(
            map(response => {
                return response as Library[];
            } 
        ));
    }

    getAllFiltered(query: Query): Observable<Query[]> {
        return this.http.post(this.urlEndPoint + '/query/getAllFiltered', query).pipe(
            map(response => {
                return response as Query[];
            } 
        ));
    }

    getDetailComponentById(id: string): Observable<any> {
        return this.http.get(this.urlEndPoint + '/query/getDetailComponent/' + id).pipe(
            map(response => {
                return response as any;
            }
        ));
    }

    getFileByQuery(query: Query): Observable<Blob> {
        return this.http.post(this.urlEndPoint + '/query/download', query, { responseType: 'blob' as 'json' }).pipe(
            map(response => {
                return response as Blob;
            })
        );
    }
    
}

