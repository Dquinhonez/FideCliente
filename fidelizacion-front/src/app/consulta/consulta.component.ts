import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  formulario!: FormGroup;
  formulario2!: FormGroup;
  listado: any = [];

  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formulario = new FormGroup({
      documento: new FormControl(null),
    });
    this.formulario2 = new FormGroup({
      monto: new FormControl(null),
    })
  }

  get getMonto(): any {
    return this.formulario2.get('monto');
  }

  get getDocumento(): any {
    return this.formulario.get('documento');
  }

  get comprobarDatos2(): boolean {
    if (!this.getMonto.value) return false;
    return true;
  }

  get comprobarDatos(): boolean {
    if (!this.getDocumento.value) return false;
    return true;
  }


  consultarPuntoMonto(){
    if (this.comprobarDatos2) {
      let obj:any = {};
      obj.monto = this.getMonto.value;
      console.log(obj);
      this.service.getPuntoMonto(obj.monto).subscribe((response) =>{
        alert(response['mensaje']);
      }, (error) => {
        console.log(error);
      })
      this.formulario2.reset();
    }
  }

}
