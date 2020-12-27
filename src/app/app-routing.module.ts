import { ListUsersComponent } from './users/list-users/list-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProfilsComponent } from './profils/list-profils/list-profils.component';
import { ListCmptsComponent } from './competences/list-cmpts/list-cmpts.component';
import { ListGrpCmptsComponent } from './grp-competences/list-grp-cmpts/list-grp-cmpts.component';
import { AddPromoComponent } from './promos/add-promo/add-promo.component';
import { ListProfilSortieComponent } from './Profil-Sortie/list-profil-sortie/list-profil-sortie.component';
import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddProfilComponent } from './profils/add-profil/add-profil.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { EditProfilComponent } from './profils/edit-profil/edit-profil.component';
import { AddProfilSortieComponent } from './Profil-Sortie/add-profil-sortie/add-profil-sortie.component';
import { EditProfilSortieComponent } from './Profil-Sortie/edit-profil-sortie/edit-profil-sortie.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'acceuil',
    component: AcceuilComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      { path: 'users', component: ListUsersComponent },
      { path: 'users/addUser', component:AddUserComponent },
      { path: 'users/editUser/:id', component:EditUserComponent },
      { path: 'profils', component: ListProfilsComponent },
      { path: 'profils/addProfil', component: AddProfilComponent },
      { path: 'profils/editProfil/:id', component: EditProfilComponent },
      { path: 'cmpts', component: ListCmptsComponent },
      { path: 'grpCmpts', component: ListGrpCmptsComponent },
      { path: 'promos', component: AddPromoComponent },
      { path: 'profil-sortie', component: ListProfilSortieComponent },
      { path: 'profil-sortie/addProfilSortie', component: AddProfilSortieComponent },
      { path: 'profil-sortie/editProfilSortie/:id', component: EditProfilSortieComponent },

    ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
