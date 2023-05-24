import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Clientes } from '../Interface/clientes';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + 'Clientes/';

  constructor(private http: HttpClient) {}

  getList(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.apiUrl}`);
  }

  add(modelo: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiUrl}guardarClientes`, modelo);
  }

  update(idCliente: number, modelo: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(
      `${this.apiUrl}actualizarCliente/${idCliente}`,
      modelo
    );
  }

  delete(idCliente: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}eliminarCliente/${idCliente}`);
  }
}
