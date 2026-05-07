import { PermissionOption } from './permission-stepper.component';

export const NO_ACCESS = { label: 'Sin acceso', value: 0 };

export const PERMISSION_MATRIX: { [key: string]: PermissionOption[] } = {
    Mantenimiento: [
        NO_ACCESS,
        { label: 'Listar', value: 1 },
        { label: 'Buscar', value: 2 },
        { label: 'Ver datos', value: 3 },
        { label: 'Nuevo', value: 4 },
        { label: 'Editar', value: 5 },
        { label: 'Desactivar', value: 6 },
        { label: 'Eliminar', value: 7 },
    ],
    Procesos: [
        NO_ACCESS,
        { label: 'Listar', value: 1 },
        { label: 'Nuevo', value: 2 },
        { label: 'Editar', value: 3 },
        { label: 'Autorizar', value: 4 },
        { label: 'Eliminar', value: 5 },
    ],
    Reportes: [
        NO_ACCESS,
        { label: 'Listar', value: 1 },
        { label: 'Buscar', value: 2 },
        { label: 'Ver', value: 3 },
        { label: 'Exportar', value: 4 },
        { label: 'Editar Reporte', value: 5 },
    ],
    Config: [
        NO_ACCESS,
        { label: 'Leer', value: 1 },
        { label: 'Nuevo', value: 2 },
        { label: 'Modificar', value: 3 },
        { label: 'Eliminar', value: 4 },
    ],
    default: [NO_ACCESS, { label: 'Acceso Total', value: 1 }],
};
