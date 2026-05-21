import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
export default [
    {
        path: 'usuarios',
        component: UsuariosComponent,
    },
    {
        path: 'perfiles',
        component: PerfilesComponent,
    },
] as Routes;