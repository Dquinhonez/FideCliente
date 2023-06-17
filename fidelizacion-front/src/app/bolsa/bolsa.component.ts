import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-bolsa',
  templateUrl: './bolsa.component.html',
  styleUrls: ['./bolsa.component.css']
})

export class BolsaComponent implements OnInit {

  formulario!: FormGroup;
  formulario2!: FormGroup;
  listado: any = [];

  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.initForm();
    this.getConceptos();
  }

  initForm() {
    this.formulario = new FormGroup({
      documento: new FormControl(null),
      monto: new FormControl(null)
    })
    this.formulario2 = new FormGroup({
      documento2: new FormControl(null),
      concepto: new FormControl(null)
    })
  }

  get getDocumento(): any {
    return this.formulario.get('documento');
  }

  get getDocumento2(): any {
    return this.formulario2.get('documento2');
  }

  get getMonto(): any {
    return this.formulario.get('monto');
  }

  get getConcepto(): any {
    return this.formulario2.get('concepto');
  }

  get comprobarDatos(): boolean {
    if (!this.getDocumento.value) return false;
    if (!this.getMonto.value) return false;
    return true;
  }

  get comprobarDatos2(): boolean {
    if (!this.getDocumento2.value) return false;
    if (!this.getConcepto.value) return false;
    return true;
  }

  agregarPunto() {
    console.log('llamo');
    console.log(this.getDocumento.value + ' - ' + this.getMonto.value)
    if (this.comprobarDatos) {
      console.log('a la funcion');
      let obj:any = {};
      obj.nro_documento = this.getDocumento.value;
      obj.monto = this.getMonto.value;
      console.log(this.getDocumento.value + ' - ' + this.getMonto.value)
      this.service.createPunto(obj).subscribe((response) =>{
        alert(response['mensaje']);
      }, (error) => {
        console.log(error);
      })
      this.formulario.reset();
    }
  }

  debitarPunto(){
    console.log(this.getDocumento2.value);
    console.log(this.getConcepto.value);
    if (this.comprobarDatos2) {
      let obj:any = {};
      obj.nro_documento = this.getDocumento2.value;
      obj.concepto_uso = this.getConcepto.value;
      this.service.debitarPunto(obj).subscribe((response) =>{
        alert(response['mensaje']);
      }, (error) => {
        console.log(error);
      })
      this.formulario.reset();
    }
  }

  getConceptos(){
    this.service.getConceptos().subscribe((response) => {
      console.log(response);
      this.listado = response;
    }, (error) => {
      console.log(error);
    })
  }

}
