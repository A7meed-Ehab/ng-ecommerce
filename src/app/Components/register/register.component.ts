import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);
  private readonly _FormBuilder=inject(FormBuilder)
  msgError: string = "";
  isLoading: boolean = false;
registerForm:FormGroup= this._FormBuilder.group({
  name:[null,[        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),]],
    email:[null,[Validators.required, Validators.email]],
    password:[null,[        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
      ]],
      rePassword:[null,[      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),]],
      phone:[null,[        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),]]
},{
  validators:this.confirmPassword
})
  confirmPassword(g: AbstractControl) {
    if (g.get("password")?.value === g.get("rePassword")?.value) {
      return null;
    } else {
      return {
        mismatch: true,
      };
    }
  }
logFormErrors(): void {
  // 1. Log Form-Level Group Errors (e.g., confirmPassword mismatch)
  if (this.registerForm.errors) {
    console.warn('Form-level Errors:', this.registerForm.errors);
  }

  // 2. Log Only Invalid Individual Controls
  Object.keys(this.registerForm.controls).forEach((key) => {
    const control = this.registerForm.get(key);
    if (control && control.invalid) {
      console.warn(`Control [${key}] is invalid:`, control.errors);
    }
  });
}

registerSubmit(): void {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    this.logFormErrors();
    return;
  }

  this.isLoading = true;

  this._authService.setRegisterForm(this.registerForm.value).subscribe({
    next: (res) => {
      console.log(res);
      this.isLoading = false;
    },
    error: (err: HttpErrorResponse) => {
      this.msgError = err.error.message;
      this.isLoading = false;
    }
  });
}

}
