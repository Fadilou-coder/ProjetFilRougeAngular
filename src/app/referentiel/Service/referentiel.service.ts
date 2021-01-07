import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  constructor( private http: HttpClient ) { }

  private baseUrl = '/api';


  findAllRefs(): any{
    return this.http.get(this.baseUrl + '/admin/referentiels');
  }

  archiverRef(data: any): any{
    return this.http.delete(this.baseUrl + '/admin/referentiels/' +  data);
  }

  addRef(data: any): any{
    return this.http.post(this.baseUrl + '/admin/referentiels',  data );
  }

  getOneGrpCompt(id: number): any{
    return this.http.get(this.baseUrl + '/admin/referentiels/' +  id);
  }

  editGrpCompt(id: number, data: any): any{
    return this.http.put(this.baseUrl + '/admin/referentiels/' +  id, data);
  }

  getGrpComptByRef(id: number): any{
    return this.http.get(this.baseUrl + '/referentiels/' +  id + '/grpe_competences');
  }
}