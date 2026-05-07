import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepItem {
    label: string;
}

@Component({
    selector: 'app-stepper',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stepper.component.html'
})
export class StepperComponent {
    @Input() steps: StepItem[] = [];
  
    @Input() currentStep: number = 1; 
  
    @Input() clickable: boolean = false; 

    @Output() stepChange = new EventEmitter<number>();

    onStepClick(index: number) {
        if (!this.clickable) return;
        
        const targetStep = index + 1;
        if (targetStep < this.currentStep) {
            this.stepChange.emit(targetStep);
        }
    }
}