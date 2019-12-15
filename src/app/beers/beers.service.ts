import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

const api = 'https://api.punkapi.com/v2/beers';
export const composeQuery = (params: any)=>{
  const arrParams = Object.entries(params).reduce((acc: Array<any>, entry: Array<any>) =>{
    if(entry[1]){
    const urlParam = entry.join('=');
    acc.push(urlParam);}
    return acc;
  }, [])
  return `?${arrParams.join('&')}`;
}
export interface BeersQuery {
  beer_name?: string,
    per_page?: number,
    page?: number 
}
@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(private http: HttpClient) { }

  public getBeers(query: BeersQuery): Observable<any> {
    const queryString = composeQuery(query)
    return this.http.get(api + queryString);
  }
  public getBeer(id: number): Observable<any> {
    return this.http.get(`${api}/${id}`);
  }
}

