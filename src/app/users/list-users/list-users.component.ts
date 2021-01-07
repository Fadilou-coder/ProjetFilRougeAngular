import  jwt_decode  from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TokenService } from 'src/app/token/service/token.service';
import { UserService } from '../service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

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
    private tokenService: TokenService,
    private sanitizer: DomSanitizer
    ) { }

  page = 1;
  users: any;
  nbrPage: any = 1;
  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';
  role = '';

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.role = this.decoded.roles[0];
      console.log(this.role);
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
  image(img: any){
    if (img) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + img);
    }else{
      return '../../../assets/image/inconu.jpeg'
    }
  }
  archiverUser(id: any){
      this.userservice.archiverUser(id).subscribe(
        (response: any) => {
          console.log(response);
          this.userservice.findAllUser(this.page).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
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

  uploadPdf() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#my-table' });
    doc.save('table.pdf');
  }


}
