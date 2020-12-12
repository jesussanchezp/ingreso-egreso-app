import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {

    if (this.formulario.invalid) { return; }

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere, por favor',
    //   showConfirmButton: false,
    //   willOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { nombre, correo, password } = this.formulario.value;
    this.authService.crearUsuario(nombre, correo, password).then( credenciales => {
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
