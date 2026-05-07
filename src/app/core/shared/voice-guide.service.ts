import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VoiceGuideService {
  
    private isVoiceEnabledSubject = new BehaviorSubject<boolean>(false);

    isVoiceEnabled$ = this.isVoiceEnabledSubject.asObservable();

    get isEnabled(): boolean {
        return this.isVoiceEnabledSubject.value;
    }

    toggleVoice(estado: boolean) {
        this.isVoiceEnabledSubject.next(estado);

        if (!estado) {
            window.speechSynthesis.cancel();
        }
    }
}
