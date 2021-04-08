import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector : 'app-footer',
  templateUrl : './footer.component.html',
  styleUrls : ['./footer.component.css']
})
export class FooterComponent {
  public autor:string = 'SysViewSoft';

  constructor (public authService: AuthService, private router: Router){
    console.log('authService: ', authService.isAuthenticated());
  }

}
