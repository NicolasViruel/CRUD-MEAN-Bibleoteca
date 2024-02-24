// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  url = 'http://localhost:4000/api/libros/';

  constructor( private http: HttpClient) { }

  getLibros(): Observable<any>{
   return this.http.get(this.url);
  }

  eliminarLibros(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarLibro(libro: Libro): Observable<any>{
    return this.http.post(this.url, libro)
  }

  obtenerLibro(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  editarLibro(id: string, libro: Libro): Observable<any>{
    return this.http.put(this.url + id, libro)
  } 
}
