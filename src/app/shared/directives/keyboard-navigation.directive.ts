import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
} from '@angular/core';
@Directive({
    selector: '[keyboardNavigation]',
    standalone: true,
})
export class KeyboardNavigationDirective implements AfterViewInit {
    private focusableElements: HTMLElement[] = [];
    private columns = 1;

    constructor(private el: ElementRef<HTMLElement>) {}

    ngAfterViewInit() {
        const elements = this.el.nativeElement.querySelectorAll(
            'app-form-field input, app-date-picker input, app-incremental-input input, input, textarea, select, [tabindex]'
        );

        this.focusableElements = Array.from(elements).filter(
            (el: any) =>
                el &&
                !el.disabled &&
                typeof el.focus === 'function' &&
                !el.closest('app-form-field[skipNavigation]') // excluye inputs dentro de app-form-field con skipNavigation
        ) as HTMLElement[];

        this.focusableElements.forEach((el, i) => (el.tabIndex = i));
        this.columns = 1; // lineal
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const keys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Enter',
        ];
        if (!keys.includes(event.key)) return;

        const activeElement = document.activeElement as HTMLElement;
        if (!activeElement) return;

        // Si el input está dentro de skipNavigation, no navegues
        if (activeElement.closest('app-form-field[skipNavigation]')) {
            return;
        }

        event.preventDefault();

        const index = this.focusableElements.indexOf(activeElement);
        if (index === -1) return;

        let nextIndex = index;
        switch (event.key) {
            case 'Enter':
            case 'ArrowRight':
                nextIndex = index + 1;
                break;
            case 'ArrowLeft':
                nextIndex = index - 1;
                break;
            case 'ArrowDown':
                nextIndex = index + this.columns;
                break;
            case 'ArrowUp':
                nextIndex = index - this.columns;
                break;
        }

        if (nextIndex < 0) nextIndex = this.focusableElements.length - 1;
        if (nextIndex >= this.focusableElements.length) nextIndex = 0;
        // Si el campo actual es un calendario, dispara Escape en su input
        const calHost = activeElement.closest(
            'p-calendar, app-date-picker p-calendar'
        ) as HTMLElement | null;
        const calInput = calHost?.querySelector(
            'input'
        ) as HTMLInputElement | null;
        if (calInput) {
            calInput.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
            );
        }

        // Defer focus para que se cierre antes de avanzar
        setTimeout(() => this.focusableElements[nextIndex]?.focus(), 0);
    }
}
