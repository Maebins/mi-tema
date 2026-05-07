import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { VoiceGuideService } from '../../core/shared/voice-guide.service';
@Directive({
    selector: '[appVoiceGuide]',
    standalone: true,
})
export class VoiceGuideDirective {

    @Input('appVoiceGuide') textoALeer: string = '';

    constructor(
        private el: ElementRef,
        private voiceService: VoiceGuideService,
        @Optional() private matTooltip: MatTooltip,
    ) {}

    @HostListener('mouseenter') onHover() {
        /*
        if (this.isButton() && this.voiceService.isEnabled) {
            this.disableVisualTooltips();
            this.readText();
        }else {
            this.enableVisualTooltips();
        }*/
        if (this.voiceService.isEnabled) { 
            this.disableVisualTooltips();
            this.readText();
        }else{
            this.enableVisualTooltips();
        }
    }

    @HostListener('focus') onFocus() {
        if (this.isInput() && this.voiceService.isEnabled) {
            this.readText();
        }
    }

    @HostListener('mouseleave') onLeave() {
        if (this.voiceService.isEnabled) {
            window.speechSynthesis.cancel();
        }
    }

    @HostListener('blur') onBlur() {
        if (this.voiceService.isEnabled) {
            window.speechSynthesis.cancel();
        }
    }

    /**
     * Metodo para leer texto ingresado en la variable 'Voice'
     */

    private readText() {
        const textoFinal =
            this.textoALeer || this.el.nativeElement.getAttribute('aria-label');

        if (textoFinal) {
            window.speechSynthesis.cancel();

            const voz = new SpeechSynthesisUtterance(textoFinal);

            const voces = window.speechSynthesis.getVoices();

            const mejorVoz =
                voces.find(
                    (v) => v.name.includes('Google') && v.lang.includes('es')
                ) ||
                voces.find(
                    (v) => v.name.includes('Microsoft') && v.lang.includes('es')
                ) ||
                voces.find((v) => v.lang.includes('es'));
            if (mejorVoz) {
                voz.voice = mejorVoz;
            }

            //  Ajustes de voz

            //Idioma
            voz.lang = 'es-ES';
            //velocidad
            voz.rate = 1.1;
            //tono
            voz.pitch = 1;

            window.speechSynthesis.speak(voz);
        }
    }

    /**
     * Método para determinar si el elemento es input
     * @returns
     */
    private isInput(): boolean {
        const tag = this.el.nativeElement.tagName;
        
        return tag === 'INPUT' || tag === 'TEXTAREA';
    }

    /**
     * Método para determinar si el elemento es tipo button
     * @returns
     */

    private isButton(): boolean {
        const tag = this.el.nativeElement.tagName;
        return (
            tag === 'BUTTON' ||
            tag === 'A' ||
            tag === 'P-BUTTON' ||
            this.el.nativeElement.getAttribute('role') === 'button'
        );
    }

    /**
     * Oculta el tooltip visual 
     */
    private disableVisualTooltips() {
        if (this.matTooltip) {
            this.matTooltip.disabled = true; 
        }
    }

    /**
     * Restaura el tooltip visual
     */
    private enableVisualTooltips() {
        if (this.matTooltip) {
            this.matTooltip.disabled = false;
        }
    }
}
