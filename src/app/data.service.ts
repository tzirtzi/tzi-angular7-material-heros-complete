import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

//remote logging service to log errors
import { MessageService } from './message.service';
import { HttpOptions } from './http-options.model';


@Injectable({providedIn: 'root'})
export class DataService {

 //private serviceUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService, 
    private serviceUrl:string,
    private httpOptions: HttpOptions) { }

  /** GET Items from the server */
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceUrl)
      .pipe(
        tap(_ => console.log('fetched Items')),
        catchError(this.handleError<any[]>('getItems', []))
      );
  }

  /** GET item by id. Return `undefined` when id not found */
  getNo404<Data>(id: number): Observable<any> {
    const url = `${this.serviceUrl}/?id=${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(items => items[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} item id=${id}`);
        }),
        catchError(this.handleError<any>(`getItem id=${id}`))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getbyId(id: number): Observable<any> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched Item id=${id}`)),
      catchError(this.handleError<any>(`getItem id=${id}`))
    );
  }

  /* GET Items whose name contains search term */
  search(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.serviceUrl}/?name=${term}`).pipe(
      tap(_ => console.log(`found items matching "${term}"`)),
      catchError(this.handleError<any[]>('searchItems', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  add (item: any): Observable<any> {
    return this.http.post<any>(this.serviceUrl, item, this.httpOptions).pipe(
      tap((newItem: any) => console.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<any>('addItem'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (item: any | number): Observable<any> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.serviceUrl}/${id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted item id=${id}`)),
      catchError(this.handleError<any>('deleteItem'))
    );
  }

  /** PUT: update the hero on the server */
  update (item: any): Observable<any> {
    return this.http.put(this.serviceUrl, item, this.httpOptions).pipe(
      tap(_ => console.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/