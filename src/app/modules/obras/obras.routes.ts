import { Routes } from '@angular/router';
import { ObrasComponent } from './obras/obras.component';
import { ImportarPresupuestoComponent } from './importar-presupuesto/importar-presupuesto.component';
import { MetradosDiariosComponent } from './metrados-diarios/metrados-diarios.component';
import { ValorizacionesComponent } from './valorizaciones/valorizaciones.component';
import { ReporteAvancesComponent } from './reporte-avances/reporte-avances.component';
export default [
    {
        path: 'obras',
        component: ObrasComponent,
    },
    {
        path: 'importar-presupuesto',
        component: ImportarPresupuestoComponent,
    },
    {
        path: 'metrados-diarios',
        component: MetradosDiariosComponent
    },
    {
        path: 'valorizaciones',
        component: ValorizacionesComponent
    },
    {
        path:'reporte-de-avances',
        component: ReporteAvancesComponent
    }
] as Routes;