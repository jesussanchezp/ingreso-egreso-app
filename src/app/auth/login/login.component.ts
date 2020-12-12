import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login() {

    if (this.formulario.invalid) { return; }

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere, por favor',
    //   showConfirmButton: false,
    //   willOpen: () => {
    //     Swal.showLoading()
    //   }
    // });


    const { email, password } = this.formulario.value;
    this.authService.loginUsuario(email, password).then( credenciales => {
      console.log(credenciales);
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
    }).catch( error => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }
}
