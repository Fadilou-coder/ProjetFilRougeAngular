import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpmtServicesService {

  constructor(
    private http: HttpClient,
  ) { }
  private baseUrl = '/api';


  findAllCompetences(): any{
    return this.http.get(this.baseUrl + '/admin/competences');
  }

  archiverCompetences(data: any): any{
    return this.http.delete(this.baseUrl + '/admin/competences/' +  data);
  }

  addCpmt(data: any): any{
    return this.http.post(this.baseUrl + '/admin/competences',  data );
  }

  findOnecmpt(data: any): any{
    return this.http.get(this.baseUrl + '/admin/competences/' + data );
  }
}
