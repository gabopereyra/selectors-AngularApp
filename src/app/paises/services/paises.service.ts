import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaisSmall } from '../interfaces/paises.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl = 'https://restcountries.com/v2';

  private _regiones : string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones() : string[]{
    return [...this._regiones];
  }

  constructor(
    private http : HttpClient,
  ) { }

  getPaisesPorRegion(region : string) : Observable<PaisSmall[]> {

    return this.http.get<PaisSmall[]>(`${this._baseUrl}/region/${region}?fields=name,alpha3Code`);
  }
}