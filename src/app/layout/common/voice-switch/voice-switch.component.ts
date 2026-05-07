import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoiceGuideService } from '../../../core/shared/voice-guide.service';
import { VoiceGuideDirective } from '../../../shared/directives/voice-guide.directive';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
@Component({
    selector: 'app-voice-switch',
    imports: [TooltipModule ,ToggleButtonModule, FormsModule, VoiceGuideDirective],
    templateUrl: './voice-switch.component.html',
    standalone: true,
    styleUrl: './voice-switch.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoiceSwitchComponent {
    // Variable para el switch
    isVoiceEnabled: boolean = false;

    constructor(private voiceService: VoiceGuideService) {}

    // Función para activar/desactivar al hacer click
    toggleVoice() {
        this.isVoiceEnabled = !this.isVoiceEnabled;
        this.voiceService.toggleVoice(this.isVoiceEnabled);
    }
}
