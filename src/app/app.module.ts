import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListProfilsComponent } from './profils/list-profils/list-profils.component';
import { AddProfilComponent } from './profils/add-profil/add-profil.component';
import { EditProfilComponent } from './profils/edit-profil/edit-profil.component';
import { ItemProfilComponent } from './profils/item-profil/item-profil.component';
import { LoginComponent } from './login/login.component';
import { AddPromoComponent } from './promos/add-promo/add-promo.component';
import { AddCmptComponent } from './competences/add-cmpt/add-cmpt.component';
import { ListCmptsComponent } from './competences/list-cmpts/list-cmpts.component';
import { DetailsCmptsComponent } from './competences/details-cmpts/details-cmpts.component';
import { ItemGrpCmptComponent } from './grp-competences/item-grp-cmpt/item-grp-cmpt.component';
import { AddGrpCmptComponent } from './grp-competences/add-grp-cmpt/add-grp-cmpt.component';
import { ListGrpCmptsComponent } from './grp-competences/list-grp-cmpts/list-grp-cmpts.component';
import { AddProfilSortieComponent } from './Profil-Sortie/add-profil-sortie/add-profil-sortie.component';
import { ListProfilSortieComponent } from './Profil-Sortie/list-profil-sortie/list-profil-sortie.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginInterceptorProvider } from './Interceptor/login.interceptor';
import { LoginGuard } from './guard/login.guard';
import { LogoutGuard } from './guard/logout.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    ListUsersComponent,
    AddUserComponent,
    EditUserComponent,
    ListProfilsComponent,
    AddProfilComponent,
    EditProfilComponent,
    ItemProfilComponent,
    LoginComponent,
    AddPromoComponent,
    AddCmptComponent,
    ListCmptsComponent,
    DetailsCmptsComponent,
    ItemGrpCmptComponent,
    AddGrpCmptComponent,
    ListGrpCmptsComponent,
    AddProfilSortieComponent,
    ListProfilSortieComponent,
    AcceuilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoginInterceptorProvider,
    LoginGuard,
    LogoutGuard
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
