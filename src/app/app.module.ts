import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ComponentsComponent } from './components/components/components.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './config/interceptors/auth.interceptor';
import { TokenInterceptor } from './config/interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UsersFormComponent } from './components/users/users.form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsDetailComponent } from './components/components/components.detail.component';
import { ComponentsDetailShowComponent } from './components/components/components.detail.show.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ComponentsComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UsersFormComponent,
    ComponentsDetailComponent,
    ComponentsDetailShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Registros por página:';
  customPaginatorIntl.firstPageLabel = 'Primer página';
  customPaginatorIntl.lastPageLabel = 'Última página';
  customPaginatorIntl.nextPageLabel = 'Siguiente página';  
  customPaginatorIntl.previousPageLabel=  'Página anterior';
  // customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => 'de';
  return customPaginatorIntl;
}
