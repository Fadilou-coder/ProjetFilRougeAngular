import  jwt_decode  from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TokenService } from 'src/app/token/service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(
    private userservice: UserService,
    private router: Router,
    private url: ActivatedRoute,
    private tokenService: TokenService
    ) { }

  page = this.url.snapshot.params['id'];
  id: any;
  users: any;
  nbrPage: any;
  token = this.tokenService.getLocalStorageToken();
  decoded:any = '';

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.decoded = this.decoded.roles[0];
      console.log(this.decoded);
    }
    if (!this.page){
      this.page = 1;
    }
    console.log(this.page);
    this.userservice.findAllUser(this.page).subscribe(
      (response: any) => {
        console.log(response);
        this.users = response['hydra:member'];
        if(response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
        }
      ,
      (error: any) => {console.log(error)}
    );
  }
  archiverUser(id: any){
      this.userservice.archiverUser(id).subscribe(
        (response: any) => {
          console.log(response);
          this.userservice.findAllUser(this.page).subscribe(
            (response: any) => {
              console.log(response);
              this.users = response['hydra:member'];
              if(response['hydra:view']){
                this.nbrPage = response['hydra:view']['hydra:last'];
                this.nbrPage = this.nbrPage.split('=')[1];
              }
              console.log(this.nbrPage);
            }
            ,
            (error: any) => {console.log(error)}
          );
        },
        error => {
          console.log(error);
          alert(error.error.detail);
        }
      );
  }

  suivant(){
    this.page++;
    this.userservice.findAllUser(this.page).subscribe(
          (response: any) => {
            console.log(response);
            this.users = response['hydra:member'];
            if(response['hydra:view']){
              this.nbrPage = response['hydra:view']['hydra:last'];
              this.nbrPage = this.nbrPage.split('=')[1];
            }
            console.log(this.nbrPage);
            }
          ,
          (error: any) => {console.log(error)}
        );
   }

  precedent(){
    this.page--;
    this.userservice.findAllUser(this.page).subscribe(
          (response: any) => {
            console.log(response);
            this.users = response['hydra:member'];
            if(response['hydra:view']){
              this.nbrPage = response['hydra:view']['hydra:last'];
              this.nbrPage = this.nbrPage.split('=')[1];
            }
            console.log(this.nbrPage);
            }
          ,
          (error: any) => {console.log(error)}
    );
  }

}
