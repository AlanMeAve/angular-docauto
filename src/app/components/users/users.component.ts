import { Component, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service.service';
import { User } from '../../models/users';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  displayedColumns: string[] = ['userName', 'name', 'firstSurname', 'secondSurname', 'email', 'edit', 'delete'];
  users: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
   this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (response: User[]) => {
        this.users = new MatTableDataSource(response);
        this.users.paginator = this.paginator || null;
        this.users.sort = this.sort || null;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
    if(this.users && this.users.paginator){
      this.users.paginator.firstPage();
    }   
  }

  delete(user: User): void {
    console.log('delete: ', user.userName);
    swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al usuario: ${user.name} ${user.firstSurname} ${user.secondSurname} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!'
    }).then((result) => {
      if (result.value) {
          this.usersService.delete(user.userName || '').subscribe(
            response => {
              console.log('response: ', response);
              this.router.navigate(['/users']);
              this.loadUsers();
              swal.fire('Éxito', 'Se elimino el usuario', 'success');
            }, erro => {
              swal.fire('Error', 'Ocurrió un error al intentar eliminar el usuario', 'error');
            }
          );
      }
    })
  }
 
}


