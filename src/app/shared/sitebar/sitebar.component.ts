import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sitebar',
  templateUrl: './sitebar.component.html',
  styles: [
  ]
})
export class SitebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {

    Swal.fire({
      title: 'Cerrando Sesión',
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      }
    });


    this.authService.logoutUsuario().then( () => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }
}
