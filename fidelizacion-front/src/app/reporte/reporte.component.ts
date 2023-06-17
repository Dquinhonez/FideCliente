import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  usopuntos: any = [];
  totalpuntos: any = [];
  constructor(private service: AppServiceService) {}

  ngOnInit() {
    this.getUsoPuntos();
    this.getTotalPuntos();
  }

  getUsoPuntos(){
    this.service.getUsoPuntos().subscribe((response) => {
      console.log(response);
      this.usopuntos = response;
    }, (error) => {
      console.log(error);
    })
  }

  getTotalPuntos(){
    this.service.getPuntoCliente().subscribe((response) => {
      console.log(response);
      this.totalpuntos = response;
    }, (error) => {
      console.log(error);
    })
  }

}
