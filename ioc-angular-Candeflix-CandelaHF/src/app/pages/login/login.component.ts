import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  email = '';
  contrasenya = '';
  error = '';
  returnUrl = '/preferits';

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/preferits';
  }

  login(): void {
    this.error = '';

    if (!this.email?.trim() || !this.contrasenya?.trim()) {
      this.error = 'Email i contrasenya són obligatoris.';
      return;
    }

    const success = this.authService.login(this.email, this.contrasenya);
    if (success) {
      this.router.navigate([this.returnUrl]);
    } else {
      this.error = 'Credencials invàlides. Prova admin@test.com / 1234';
    }
  }
}
