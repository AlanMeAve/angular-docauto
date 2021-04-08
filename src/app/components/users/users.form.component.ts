import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users-form',
  templateUrl: './users.form.component.html',
  styleUrls: ['./users.form.component.css']
})
export class UsersFormComponent implements OnInit {

  hide = true;
  roles: any[] = [{ code : 'ADMIN', name: 'Administrador'}, { code : 'USER', name : 'Usuario'}];

  userNameEdit?: string;
  user: User = new User();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    
      this.activatedRoute.params.subscribe(params => {
      let userNameParam = params['userNameParam'];
      console.log('userNameParam', userNameParam);
      if(userNameParam){
        this.userNameEdit = userNameParam;
        this.usersService.getUserByUserName(this.userNameEdit || '').subscribe(
          (user: User) => {
            if(user) {
              this.user = user;
            } else {
              this.router.navigate(['/index']);
            }           
          }
        );
      }
    });
  }

  edit(): void {
    console.log('edit: ', this.user);
    this.usersService.update(this.userNameEdit || '', this.user).subscribe(
      (response: User) => {
        this.router.navigate(['/users']);
        swal.fire('Éxito', `Usuario <b>${this.user.name}</b> editado con éxito!`, 'success');
      }, err => {
        swal.fire('Error', 'Ocurrió un error al editar el usuario', 'error');
      }
    );
  }

  save(): void {
    this.usersService.save(this.user).subscribe(
      (response: User) => {
        this.router.navigate(['/users']);
        swal.fire('Éxito', `cliente <b>${this.user.name}</b> creado con éxito!`, 'success');
      }, err => {
        swal.fire('Error', 'Ocurrió un error al guardar el usuario', 'error');
      }
    );
  }

}
