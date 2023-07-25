import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProviderClass } from '../model/providers.class';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  //URL Endpoint For Express App
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Get all records
  getProviders(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  //Get one record
  getProvider(id: number): Observable<any>{
    return this.http.get(this.apiUrl + id);
  }

  //Update a record
  updateProvider(id: number, newProvider: ProviderClass): Observable<ProviderClass>{
    return this.http.put<ProviderClass>(this.apiUrl + id,newProvider);
  }

  //Create a Record
  addProvider(newProvider: ProviderClass): Observable<any>{
    return this.http.post(this.apiUrl,newProvider);
  }

  //Delete a Record
  deleteProvider(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + id);
  }

  //Details of a Provider
  detailProvider(id: number): Observable<any>{
    return this.http.get(this.apiUrl + id);
  }
}
