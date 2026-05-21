import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-sign-in',
  imports: [CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonComponent,
        FormFieldComponent,],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.scss',
  standalone: true
})
export class SignInComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private _authService = inject(AuthService);

    isLoading = signal(false);

    loginForm: FormGroup = this.fb.group({
        user: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    onSubmit(): void {
        console.log(this.loginForm.value);

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);

        this.router.navigate(['/general/dashboard']);

        /**this._authService.signIn(this.loginForm.value).subscribe({
            next: () => {
                console.log('Bienvenido', 'Inicio de sesión exitoso.');
                this.router.navigate(['/dashboard']);
            },
            error: () => {
                this.isLoading.set(false);
            },
            complete: () => {
                this.isLoading.set(false);
            },
        });*/
    }
}