import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/users';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: String = "Consulta de Documentación Técnica";
  logIn: String = "Iniciar Sesión";
  user: User = new User();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/index']);
    }
  }

  login(): void {
    console.log('login: ', this.user);
    if(this.user == null || this.user.userName == null || this.user.password == null){
      swal.fire('Alerta', 'Username o password vacías!', 'error');
    } else {
      this.authService.login(this.user).subscribe(response => {
        this.authService.saveUser(response.access_token);
        this.authService.saveToken(response.access_token);
        this.router.navigate(['/index']);
        let user = this.authService.user;
        // swal.fire('Éxito', `user ${user.name}`, 'success');
      }, error => {
        if(error.status == 400){
          swal.fire('Error Login', 'Usuario o clave incorrecta', 'error');
        } else {
          swal.fire('Error Login', 'Ocurrió un error al iniciar sesión', 'error');
        }
      });
    }
  }

}
