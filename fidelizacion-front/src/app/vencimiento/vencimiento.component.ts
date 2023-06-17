import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-vencimiento',
  templateUrl: './vencimiento.component.html',
  styleUrls: ['./vencimiento.component.css']
})
export class VencimientoComponent implements OnInit {

  formulario!: FormGroup;
  listado: any = [];

  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.initForm();
    this.getReglaVencimiento();
  }

  initForm() {
    this.formulario = new FormGroup({
      fecha1: new FormControl(null),
      fecha2: new FormControl(null),
      diaespecial: new FormControl(null),
    })
  }

  get getfechaInicio(): any {
    return this.formulario.get('fecha1');
  }

  get getfechaFin(): any {
    return this.formulario.get('fecha2');
  }

  get getdiaEspecial(): any {
    return this.formulario.get('diaespecial');
  }

  get validar(): boolean {
    if (this.listado && this.listado.length > 0) return false;
    return true;
  }

  get comprobarDatos(): boolean {
    if (!this.getfechaFin.value) return false;
    if (!this.getfechaInicio.value) return false;
    if (!this.getdiaEspecial.value) return false;
    return true;
  }

  agregarReglaVencimiento() {
    if (this.comprobarDatos) {
      let obj:any = {};
      obj.fecha_inicio_validez = this.getfechaInicio.value;
      obj.fecha_fin_validez = this.getfechaFin.value;
      obj.diaEspecial = this.getdiaEspecial.value;
      this.service.createReglaVencimiento(obj).subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      this.limpiarVista();
      this.getReglaVencimiento();
    }
  }

  getReglaVencimiento(){
    this.service.getReglaVencimiento().subscribe((response) => {
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
