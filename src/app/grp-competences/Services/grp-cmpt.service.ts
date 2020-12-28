import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrpCmptService {

  constructor(
    private http: HttpClient,
  ) { }
  private baseUrl = '/api';


  findAllGrpCompetences(page: any): any{
    return this.http.get(this.baseUrl + '/admin/gprecompetences?page=' + page);
  }

  archiverGrpCompetences(data: any): any{
    return this.http.delete(this.baseUrl + '/admin/grpecompetences/' +  data);
  }

  addGrpCpmt(data: any): any{
    return this.http.post(this.baseUrl + '/admin/grpecompetences/',  data );
  }
}
