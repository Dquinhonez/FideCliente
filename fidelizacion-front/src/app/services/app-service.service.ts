import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get('/api/cliente/obtenerClientes');
  };

  createCliente(datos: any){
    return this.http.post('/api/cliente/add', datos);
  };

  getConceptos(){
    return this.http.get('/api/puntos/get_concepto_uso');
  };

  createConcepto(datos: any){
    return this.http.post('/api/puntos/create_concepto_uso', datos);
  };

  getRegla(){
    return this.http.get('/api/puntos/get_punto_asignacion');
  };

  createRegla(datos: any){
    return this.http.post('/api/puntos/create_punto_asignacion', datos);
  }

  createPunto(datos: any){
    return this.http.post('/api/puntos/add_punto_bolsa', datos);
  }

  debitarPunto(datos: any){
    return this.http.post('/api/puntos/debitar_puntos', datos);
  }

  getPuntoCliente(){
    return this.http.get('/api/puntos/get_all_puntos');
  };

  getPuntoMonto(monto: any){
    return this.http.get('/api/puntos/get_xpuntos_byMonto/' + monto);
  };

  createReglaVencimiento(datos: any){
    return this.http.post('/api/puntos/create_punto_vencimiento', datos);
  };

  getReglaVencimiento(){
    return this.http.get('/api/puntos/get_regla_venc');
  };

  getUsoPuntos(){
    return this.http.get('/api/puntos/get_uso_puntos');
  };

}
