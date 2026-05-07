import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Renderer2,
    ViewChild,
    forwardRef,
    Input,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-incremental-input',
    standalone: true, 
    imports: [InputNumberModule, FormsModule, FluidModule, CommonModule],
    templateUrl: './incremental-input.component.html',
    styleUrl: './incremental-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IncrementalInputComponent),
            multi: true,
        },
    ],
})
export class IncrementalInputComponent implements ControlValueAccessor, AfterViewInit {
    @Input() label: string = '';
    @Input() inputId: string = '';
    @Input() min: number = 0;
    @Input() max: number | null = null;
    @Input() mode: 'decimal' | 'currency' = 'decimal';
    @Input() showButtons: boolean = true;
    @Input() placeholder: string = '';
    @Input() allowDecimals: boolean = false;
    @Input() useGrouping: boolean = false;
    @Input() horizontal: boolean = false;
    @Input() borderless: boolean = false;
    
    @Input() error: boolean = false; 

    @ViewChild('inputNumberHost', { static: false })
    inputNumberHost!: ElementRef<HTMLElement>;

    public value: number | null = null;
    public isDisabled: boolean = false;

    constructor(private renderer: Renderer2) {}

    private onChange: (value: any) => void = () => {};
    private onTouched: () => void = () => {};

    ngAfterViewInit(): void {
        setTimeout(() => this.configurarInputInterno(), 50);
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    onModelChange(newValue: number): void {
        this.value = newValue;
        this.onChange(newValue);
    }

    onBlur(): void {
        this.onTouched();
    }

    configurarInputInterno(): void {
        const input = this.inputNumberHost?.nativeElement.querySelector('input');
        if (!input) return;

        this.renderer.setAttribute(input, 'autocomplete', 'off');
        this.renderer.setAttribute(input, 'autocorrect', 'off');
        this.renderer.setAttribute(input, 'autocapitalize', 'off');
        this.renderer.setAttribute(input, 'spellcheck', 'false');
        this.renderer.setAttribute(
            input,
            'name',
            `no-autofill-${this.inputId || 'number'}-${Date.now()}`
        );
        this.renderer.removeAttribute(input, 'title');
    }
}