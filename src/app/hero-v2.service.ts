import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { DataService } from './data.service';
import { Hero } from './hero';


@Injectable({ providedIn: 'root'})
export class Hero2Service extends DataService {

  constructor( http: HttpClient, msgService: MessageService ) { 
      super( http, msgService, 'api/test2', { 'headers': new HttpHeaders( { 'Content-Type': 'application/json' }) } );
  }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return super.getAll();
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    return super.getNo404(id);
  }

  getHero(id: number): Observable<Hero> {
    return super.getbyId(id);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    return super.search(term);
  }

    //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return super.add(hero);
  }

    /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    return super.delete(hero);
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return super.update(hero);
  }

}
