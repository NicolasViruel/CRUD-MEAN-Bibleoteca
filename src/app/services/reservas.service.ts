import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  url= 'http://localhost:4000/api/reserva/';


  constructor(private http: HttpClient) { }

  getReservas(): Observable<any>{
    
  return this.http.get(this.url);
  }

  eliminarReserva(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }
  
  guardarReserva(reserva: Reserva) : Observable<any>{
    return this.http.post(this.url, reserva);
  }





}

