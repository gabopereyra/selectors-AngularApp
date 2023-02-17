import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais, PaisSmall } from '../interfaces/paises.interface';
import { combineLatest, Observable, of } from 'rxjs';

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

  getPaisPorAlphaCode(alpha : string) : Observable<Pais | null> {
    if(!alpha){
      return of(null); 
    }
    return this.http.get<Pais>(`${this._baseUrl}/alpha/${alpha}`);
  }

  getPaisPorCodigoSmall(cod : string) : Observable<PaisSmall> {
    return this.http.get<PaisSmall>(`${this._baseUrl}/alpha/${cod}?fields=name,alpha3Code`);
  }

  getPaisesPorCodigos(borders : string[]) : Observable<PaisSmall[]>{
    if(!borders){
      return of([])
    }

    const peticiones : Observable<PaisSmall>[] = [];
    
    borders.forEach( cod => {
      const peticion = this.getPaisPorCodigoSmall(cod);
      peticiones.push( peticion );
    });

    return combineLatest( peticiones );
  }

}