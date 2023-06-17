import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-regla',
  templateUrl: './regla.component.html',
  styleUrls: ['./regla.component.css']
})
export class ReglaComponent implements OnInit {

  formulario!: FormGroup;
  listado: any = [];

  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.initForm();
    this.getReglas();
  }

  initForm() {
    this.formulario = new FormGroup({
      limiteInferior: new FormControl(null),
      limiteSuperior: new FormControl(null),
      equivalencia: new FormControl(null),
      cantidad: new FormControl(null),
    })
  }

  get getLimiteInferior(): any {
    return this.formulario.get('limiteInferior');
  }

  get getLimiteSuperior(): any {
    return this.formulario.get('limiteSuperior');
  }

  get getEquivalencia(): any {
    return this.formulario.get('equivalencia');
  }

  get getCantidad(): any {
    return this.formulario.get('cantidad');
  }

  get validar(): boolean {
    if (this.listado && this.listado.length > 0) return false;
    return true;
  }

  get comprobarDatos(): boolean {
    if (!this.getLimiteInferior.value) return false;
    if (!this.getLimiteSuperior.value) return false;
    if (!this.getEquivalencia.value) return false;
    if (!this.getCantidad.value) return false;
    return true;
  }

  agregar() {
    if (this.comprobarDatos) {
      let obj:any = {};
      obj.limite_inferior = this.getLimiteInferior.value;
      obj.limite_superior = this.getLimiteSuperior.value;
      obj.monto_punto_equivalencia = this.getEquivalencia.value;
      obj.punto_equivalencia = this.getCantidad.value;
      this.service.createRegla(obj).subscribe(() =>{
        this.getReglas();
      }, (error) => {
        console.log(error);
      })
      this.limpiarVista();
    }
  }

  getReglas(){
    this.service.getRegla().subscribe((response) => {
      console.log(response);
      this.listado = response;
    }, (error) => {
      console.log(error);
    })
  }

  limpiarVista() {
    this.initForm();
  }

}
