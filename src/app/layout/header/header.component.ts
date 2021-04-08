import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector : 'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent {

   title:string = 'SysViewSoft';

   constructor (public authService: AuthService, private router: Router){
    console.log('authService: ', authService.isAuthenticated());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
   
}
