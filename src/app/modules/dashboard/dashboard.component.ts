import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CustomFormField } from '../../shared/components/form-field/form-field.types';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { IncrementalInputComponent } from '../../shared/components/incremental-input/incremental-input.component';
import { AutocompleteFieldComponent } from '../../shared/components/autocomplete-field/autocomplete-field.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CheckBoxComponent } from '../../shared/components/check-box/check-box.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { PERMISSION_MATRIX } from '../../shared/components/permission-stepper/permissionConfig';
import { PermissionStepperComponent } from '../../shared/components/permission-stepper/permission-stepper.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { RadioButtonComponent } from '../../shared/components/radio-button/radio-button.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SummaryCardComponent } from '../../shared/components/summary-card/summary-card.component';
import { TableColumn } from '../../shared/components/table/table.types';
import { TableComponent } from '../../shared/components/table/table.component';
import { ToggleButtonComponent } from '../../shared/components/toggle-button/toggle-button.component';
import { ToastModule } from 'primeng/toast';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { UploadImageComponent } from '../../shared/components/upload-image/upload-image.component';
import { UplodadImageSimpleComponent } from '../../shared/components/uplodad-image-simple/uplodad-image-simple.component';
@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        FormFieldComponent,
        FormsModule,
        DatePickerComponent,
        DialogComponent,
        IncrementalInputComponent, AutocompleteFieldComponent,
        CardComponent,
        CheckBoxComponent, 
        FileUploadComponent,
        PermissionStepperComponent,
        ProgressBarComponent,
        RadioButtonComponent,
        SearchBarComponent,
        SummaryCardComponent,
        TableComponent,
        ToggleButtonComponent,
        ToastModule, 
        AlertComponent,
        TabsComponent,
        StepperComponent,
        UploadImageComponent,
        UplodadImageSimpleComponent
    ],
    providers: [ConfirmationService, MessageService,],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  
    private fb = inject(FormBuilder);
    private confirmationService = inject(ConfirmationService);

  displayRegister = true;
  displayAlert = false;
  displayDelete = false;

  notificar = false;
  malEstado = false;
  aceptaTerminos= false;

  terminoGlobal= '';

  
  miFuncionDeGuardado(){}
  redigirAlLogin(){}
  confirmarEliminacion(){}
  filtrarTabla(event: any){}

    // Opciones de prueba para los selects
  opcionesEstado = [
    { label: 'Bueno', value: 'B' },
    { label: 'Regular', value: 'R' },
    { label: 'Malo', value: 'M' }
  ];

  opcionesPersonal = [
    { label: 'Juan Perez', value: 1 },
    { label: 'Maria Lopez', value: 2 },
    { label: 'Carlos Ruiz', value: 3 }
  ];

  // 1. TEXTO NORMAL[cite: 3, 5]
  configText: CustomFormField = {
    type: 'text',
    label: 'Código Patrimonial',
    placeholder: 'Ej. 740893320001',
    required: true,
    inputTooltip: 'Ingrese el código de 12 dígitos'
  };

  // 2. TEXTAREA[cite: 3, 5]
  configTextarea: CustomFormField = {
    type: 'textarea',
    label: 'Descripción del Bien',
    placeholder: 'Detalle las características físicas...',
    maxLength: 250
  };

  // 3. SELECT LABEL (Guarda el label en vez del value)[cite: 3, 5]
  configSelectLabel: CustomFormField = {
    type: 'selectLabel',
    label: 'Condición (Select Label)',
    options: this.opcionesEstado,
    placeholder: 'Seleccione condición'
  };

  // 4. SELECT VALUE (El select estándar)[cite: 3, 5]
  configSelectValue: CustomFormField = {
    type: 'selectValue',
    label: 'Estado de Conservación (Select Value)',
    options: this.opcionesEstado,
    placeholder: 'Seleccione estado',
    tooltipOnHover: true
  };

  // 5. SELECT INPUT (Permite escribir o seleccionar)[cite: 3, 5]
  configSelectInput: CustomFormField = {
    type: 'selectInput',
    label: 'Marca (Select Input Editable)',
    options: [
      { label: 'HP', value: 'HP' },
      { label: 'Lenovo', value: 'LEN' },
      { label: 'Dell', value: 'DEL' }
    ],
    placeholder: 'Escriba o seleccione una marca'
  };

  // 6. SELECT FILTER (Dropdown con buscador interno)[cite: 3, 5]
  configSelectFilter: CustomFormField = {
    type: 'selectFilter',
    label: 'Responsable (Select Filter)',
    options: this.opcionesPersonal,
    placeholder: 'Buscar responsable...'
  };

  valorDni: string = '';

  // 7. SELECT MULTIPLE (Con tags/chips)[cite: 3, 5]
  configSelectMultiple: CustomFormField = {
    type: 'selectMultiple',
    label: 'Accesorios Incluidos (Select Multiple)',
    options: [
      { label: 'Teclado', value: 'TEC' },
      { label: 'Mouse', value: 'MOU' },
      { label: 'Monitor', value: 'MON' },
      { label: 'Cables', value: 'CAB' }
    ],
    placeholder: 'Seleccione múltiples'
  };

  configError: CustomFormField = {
  type: 'text',
  label: 'Número de DNI',
  placeholder: 'Ingrese 8 dígitos',
  required: true,
  maxLength: 8,
  // Estos mensajes son los que se mostrarán debajo del input
  errorMessages: {
    required: 'Este campo es obligatorio para el registro.',
    minlength: 'El DNI debe tener exactamente 8 dígitos.'
  }
};

// Variables para almacenar las fechas
  fechaSimple: Date | null = null;
  fechaYHora: Date | null = null;
  soloHora: Date | null = null;

  // Fecha mínima (Ejemplo: Hoy)
  fechaMinima = new Date();

  miFormulario!: FormGroup;

  // 1. Tu base de datos simulada (Ej. Personal responsable de un bien)
  listaPersonal = [
    { id: 1, nombreCompleto: 'Juan Perez', cargo: 'Analista de Sistemas' },
    { id: 2, nombreCompleto: 'Maria Lopez', cargo: 'Jefa de Patrimonio' },
    { id: 3, nombreCompleto: 'Carlos Ruiz', cargo: 'Técnico de Soporte' },
    { id: 4, nombreCompleto: 'Juan Perez', cargo: 'Analista de Sistemas' },
    { id: 5, nombreCompleto: 'Maria Lopez', cargo: 'Jefa de Patrimonio' },
    { id: 6, nombreCompleto: 'Carlos Ruiz', cargo: 'Técnico de Soporte' },
    { id: 7, nombreCompleto: 'Juan Perez', cargo: 'Analista de Sistemas' },
    { id: 8, nombreCompleto: 'Maria Lopez', cargo: 'Jefa de Patrimonio' },
    { id: 9, nombreCompleto: 'Carlos Ruiz', cargo: 'Técnico de Soporte' },
    { id: 10, nombreCompleto: 'Juan Perez', cargo: 'Analista de Sistemas' },
    { id: 11, nombreCompleto: 'Maria Lopez', cargo: 'Jefa de Patrimonio' },
    { id: 12, nombreCompleto: 'Carlos Ruiz', cargo: 'Técnico de Soporte' }
  ];

  // 2. Arreglo vacío donde PrimeNG guardará lo que coincida con la búsqueda
  sugerenciasFiltradas: any[] = [];

  // 3. La configuración exacta de tu componente
  configAuto = {
    label: 'Responsable del Bien',
    controlName: 'responsableObj', // Debe coincidir con tu formControlName
    placeholder: 'Escriba para buscar...',
    field: 'nombreCompleto', // Le dice a PrimeNG qué propiedad pintar en la lista
    tooltip: true,
    tooltipField: 'cargo' // Magia: Al pasar el mouse por la lista, mostrará el cargo
  };


  ngOnInit() {
    // Inicializamos el formulario reactivo
    this.miFormulario = this.fb.group({
      responsableObj: [null, Validators.required]
    });
  }

  // 4. El método que filtra. PrimeNG lo llama cada vez que tecleas algo.
  // Usamos flecha (=>) para que 'this' siga apuntando a esta clase.
  filtrarPersonal = (event: any) => {
    const textoBuscado = event.query.toLowerCase();
    
    this.sugerenciasFiltradas = this.listaPersonal.filter(persona => 
      persona.nombreCompleto.toLowerCase().includes(textoBuscado)
    );
  }

  // Solo para ver qué guardó
  verQueHayEnElFormulario() {
    console.log(this.miFormulario.value);
  }

  // Aquí se guardará el archivo (File) cuando se suba uno solo
  documentoPrincipal: any = null;

  // Aquí se guardará un arreglo de archivos (File[])
  fotosDelBien: any[] = [];

  verQueHay() {
    console.log('Documento Principal:', this.documentoPrincipal);
    console.log('Fotos del Bien:', this.fotosDelBien);
  }


  // Traemos la matriz de permisos
  public matrix = PERMISSION_MATRIX;

  // Variables para probar el enlace de datos (ngModel)
  public nivelMantenimiento = 3; // Empezará en 'Ver datos'
  public nivelProcesos = 0;      // Empezará en 'Sin acceso'
  public nivelReportes = 1;      // Empezará en 'Listar'

  verResultados() {
    console.log({
      mantenimiento: this.nivelMantenimiento,
      procesos: this.nivelProcesos,
      reportes: this.nivelReportes
    });
  }

  tipoPersona= false
  opciones = [{label: 'fdfd', value: 'fdfd'}];

  // 1. Definición de todas las columnas posibles
    public columnas: TableColumn[] = [
        { header: 'ID', field: 'id', width: '60px' },
        { header: 'Nombre del Bien', field: 'nombre', editable: true }, // Celda editable
        { header: 'Fecha Registro', field: 'fecha', type: 'date', width: '180px' }, // Tipo fecha
        { header: 'Ubicación', field: 'ubicacion' },
    ];

    // 2. Opciones para la columna de selección rápida
    public opcionesPrioridad = [
        { label: 'Alta', value: 'H' },
        { label: 'Media', value: 'M' },
        { label: 'Baja', value: 'L' }
    ];

    // 3. Datos de prueba con diferentes estados
    public datos = [
        { 
            id: 1, nombre: 'Laptop Dell Latitude', fecha: new Date(), ubicacion: 'Oficina 101',
            prioridad: 'H', checked: true, 
            estadoLabel: 'Activo', estadoType: 'success' // Chip verde
        },
        { 
            id: 2, nombre: 'Escritorio Madera', fecha: new Date(), ubicacion: 'Almacén',
            prioridad: 'M', checked: false, 
            estadoLabel: 'Inactivo', estadoType: 'warning' // Chip naranja
        },
        { 
            id: 3, nombre: 'Proyector Epson', fecha: new Date(), ubicacion: 'Sala Reuniones',
            prioridad: 'L', checked: true, 
            estadoLabel: 'Dado de Baja', estadoType: 'danger' // Chip rojo
        }
    ];

    // 4. Handlers para todos los eventos
    handleAction(type: string, row: any) {
        console.log(`Acción: ${type}`, row);
    }

    onCellEdit(event: any) {
        console.log('Celda editada:', event);
    }
    modoAuditoria= false


    // Inyectamos el servicio en el constructor
    constructor(private messageService: MessageService) {}

    // --- MÉTODOS PARA LLAMAR A LOS TOASTS ---

    mostrarExito() {
        this.messageService.add({
            severity: 'success', 
            summary: 'Operación Exitosa', 
            detail: 'El bien patrimonial se guardó correctamente.',
            life: 3000 // Desaparece en 3 segundos
        });
    }

    mostrarError() {
        this.messageService.add({
            severity: 'error', 
            summary: 'Error del Servidor', 
            detail: 'No se pudo conectar con la base de datos.',
            life: 4000
        });
    }

    mostrarAdvertencia() {
        this.messageService.add({
            severity: 'warn', 
            summary: 'Atención', 
            detail: 'Faltan completar campos obligatorios.',
        });
    }

    mostrarInfo() {
        this.messageService.add({
            severity: 'info', 
            summary: 'Sincronización', 
            detail: 'Los datos se están actualizando en segundo plano.',
        });
    }
    pestanas = [
        { id: 'info', label: 'Información general', icon: 'pi pi-file' },
        { id: 'docs', label: 'Documentos', icon: 'pi pi-folder' },
        { id: 'historial', label: 'Historial', icon: 'pi pi-history' },
        { id: 'obs', label: 'Observaciones', disabled: true }
    ];

    pestanaActiva = 'info'; 

    misPasos = [
        { label: 'Datos personales' },
        { label: 'Documentos' },
        { label: 'Verificación' },
        { label: 'Confirmación' }
    ];

    pasoActual = 3; // Esto iluminará el paso 3 y pondrá checks en el 1 y 2

    // Función para cambiar de paso
    irAlPaso(paso: number) {
        this.pasoActual = paso;
    }
    // --- Configuración de Tabs ---
    pestanas1 = [
        { id: 'registro', label: 'Registro de Bien', icon: 'pi pi-plus-circle' },
        { id: 'adjuntos', label: 'Galería y Fotos', icon: 'pi pi-images' },
        { id: 'alertas', label: 'Centro de Avisos', icon: 'pi pi-bell' }
    ];
    pestanaActiva1 = 'registro';

    // --- Configuración de Stepper ---
    pasos = [
        { label: 'Información' },
        { label: 'Ubicación' },
        { label: 'Finalizar' }
    ];
    pasoActual1 = 1;

    // --- Variables para Imágenes ---
    imagenesSeleccionadas: any[] = []; // Para el componente complejo (ControlValueAccessor)

    // --- Métodos de Acción ---
    
    // Cambiar de paso en el Stepper
    irAlSiguiente() {
        if (this.pasoActual < this.pasos.length) this.pasoActual++;
    }

    irAtras() {
        if (this.pasoActual > 1) this.pasoActual--;
    }

    // Manejar imagen del componente simple (Cámara/Galería)
    onImagenProcesada(archivo: File) {
        console.log('Imagen recibida de la cámara/selector:', archivo);
        // Aquí podrías subirla directamente al servidor
    }
}

