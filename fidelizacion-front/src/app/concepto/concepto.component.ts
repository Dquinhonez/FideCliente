import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
  styleUrls: ['./concepto.component.css']
})
export class ConceptoComponent implements OnInit {

  formulario!: FormGroup;
  listado: any = [];

  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formulario = new FormGroup({
      descripcion: new FormControl(null),
      puntos: new FormControl(null)
    })
    this.getConceptos();
  }

  get getDescripcion(): any {
    return this.formulario.get('descripcion');
  }

  get getPuntos(): any {
    return this.formulario.get('puntos');
  }

  get validar(): boolean {
    if (this.listado && this.listado.length > 0) return false;
    return true;
  }

  get comprobarDatos(): boolean {
    if (!this.getDescripcion.value) return false;
    if (!this.getPuntos.value) return false;
    return true;
  }

  agregar() {
    if (this.comprobarDatos) {
      let obj:any = {};
      obj.concepto_uso = this.getDescripcion.value;
      obj.puntos_requeridos = this.getPuntos.value;
      this.service.createConcepto(obj).subscribe(() =>{
        this.getConceptos();
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

  limpiarVista() {
    this.formulario.reset();
  }

}
