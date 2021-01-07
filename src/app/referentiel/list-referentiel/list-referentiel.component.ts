import { Component, OnInit } from '@angular/core';
import { ReferentielService } from 'src/app/referentiel/Service/referentiel.service';

@Component({
  selector: 'app-list-referentiel',
  templateUrl: './list-referentiel.component.html',
  styleUrls: ['./list-referentiel.component.css']
})
export class ListReferentielComponent implements OnInit {

  constructor(
    private refService: ReferentielService,
  ) { }

  page = 1;
  Refs: any;
  nbrPage: any = 1;

  ngOnInit(): void {
    console.log(this.page);
    this.refService.findAllRefs().subscribe(
      (response: any) => {
        console.log(response);
        this.Refs = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
      }
      ,
      (error: any) => { console.log(error); }
    );
  }
  archiverRef(id: any): any{
    this.refService.archiverRef(id).subscribe(
      (response: any) => {
        console.log(response);
        this.refService.findAllRefs().subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          (response: any) => {
            console.log(response);
            this.Refs = response['hydra:member'];
            if (response['hydra:view']){
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

  suivant(): any{
    this.page++;
    this.refService.findAllRefs().subscribe(
      (response: any) => {
        console.log(response);
        this.Refs = response['hydra:member'];
        if (response['hydra:view']){
          this.nbrPage = response['hydra:view']['hydra:last'];
          this.nbrPage = this.nbrPage.split('=')[1];
        }
        console.log(this.nbrPage);
      }
      ,
      (error: any) => {console.log(error)}
    );
  }
  precedent(): any{
    this.page--;
    this.refService.findAllRefs().subscribe(
      (response: any) => {
        console.log(response);
        this.Refs = response['hydra:member'];
        if (response['hydra:view']){
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
