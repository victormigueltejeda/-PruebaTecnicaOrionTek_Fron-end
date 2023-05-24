import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Direccion } from '../Interface/direccion';

@Injectable({
  providedIn: 'root',
})
export class DireccionesService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + `Cliente/Direccion/`;

  constructor(private http: HttpClient) {}

  getList(idCliente: number): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.apiUrl}${idCliente}`);
  }

  add(idCliente: number, modelo: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(`${this.apiUrl}${idCliente}`, modelo);
  }
}
