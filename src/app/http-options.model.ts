import { HttpHeaders } from '@angular/common/http';

export interface IHttpOptions {
  headers: HttpHeaders;
};

export class HttpOptions implements IHttpOptions {
  headers: HttpHeaders; 
};

// { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }