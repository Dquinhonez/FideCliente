import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DebitarBolsaComponent } from '../../DebitarBolsa/DebitarBolsa.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { BolsaComponent } from '../../bolsa/bolsa.component';
import { MapsComponent } from '../../maps/maps.component';
import { ReporteComponent } from '../../reporte/reporte.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClienteComponent } from '../../cliente/cliente.component';
import { ConceptoComponent } from '../../concepto/concepto.component';
import { ReglaComponent } from '../../regla/regla.component';
import { ConsultaComponent } from '../../consulta/consulta.component';
import { VencimientoComponent } from '../../vencimiento/vencimiento.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'debitarBolsa',   component: DebitarBolsaComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'bolsa',          component: BolsaComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'reportes',        component: ReporteComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'cliente',        component: ClienteComponent },
    { path: 'concepto',       component: ConceptoComponent },
    { path: 'regla',       component: ReglaComponent },
    { path: 'consulta',       component: ConsultaComponent },
    { path: 'vencimiento',       component: VencimientoComponent }
];
