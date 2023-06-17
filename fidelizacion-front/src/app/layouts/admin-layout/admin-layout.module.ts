import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DebitarBolsaComponent } from '../../DebitarBolsa/DebitarBolsa.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { BolsaComponent } from '../../bolsa/bolsa.component';
import { MapsComponent } from '../../maps/maps.component';
import { ReporteComponent } from '../../reporte/reporte.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClienteComponent } from '../../cliente/cliente.component';
import { ConceptoComponent } from '../../concepto/concepto.component';
import { ReglaComponent } from '../../regla/regla.component';
import { ConsultaComponent } from '../../consulta/consulta.component';
import { VencimientoComponent } from '../../vencimiento/vencimiento.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    DebitarBolsaComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    BolsaComponent,
    MapsComponent,
    ReporteComponent,
    ClienteComponent,
    ConceptoComponent,
    ReglaComponent,
    ConsultaComponent,
    VencimientoComponent
  ]
})

export class AdminLayoutModule {}
