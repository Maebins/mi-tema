import { Routes } from '@angular/router';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { UnidadesEjecutorasComponent } from './unidades-ejecutoras/unidades-ejecutoras.component';
import { PersonasComponent } from './personas/personas.component';
export default [
    {
        path: 'instituciones',
        component: InstitucionesComponent,
    },
    {
        path: 'unidades-ejecutoras',
        component: UnidadesEjecutorasComponent,
    },
    {
        path:'personas',
        component: PersonasComponent
    }
] as Routes;