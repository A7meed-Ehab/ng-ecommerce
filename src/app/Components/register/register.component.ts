import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { error } from "console";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);
  msgError: string = "";
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
      ]),
          rePassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
    ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPassword,
  );

  confirmPassword(g: AbstractControl) {
    if (g.get("password")?.value === g.get("rePassword")?.value) {
      return null;
    } else {
      return {
        mismatch: true,
      };
    }
  }
registerSubmit(): void {

  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();

    console.log(this.registerForm.errors);

    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);

      console.log(key, control?.errors);
    });

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
